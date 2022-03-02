import { authenticate } from "middlewares/authenticate";
import wrapper from "redux/index";
import { setUserInfo, setHostInfo, setLoggedIn } from "redux/actions/authenticateActions";
import ChatSection from "components/chat/ChatSection";

const Chat = () => {
    return (
        <ChatSection />
    );
}


export const getServerSideProps = wrapper.getServerSideProps(store => authenticate(async (context) => {
    const { req, query } = context;
    const userId = req?.cookieUserId;
    const hostName = query?.username;

    if(!userId) {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            }
        };
    }

    try {
        const userResponse = await fetch("http://localhost:3000/api/user", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ userId: userId }),
        });
        const user = await userResponse.json();
        if(!userResponse.ok) {
            throw user.message;
        }

        const hostResponse = await fetch("http://localhost:3000/api/user", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ username: hostName }),
        });
        const host = await hostResponse.json();
        if(!hostResponse.ok) {
            throw host.message;
        }

        store.dispatch(setUserInfo(user.userData));
        store.dispatch(setLoggedIn(true));
        store.dispatch(setHostInfo(host.userData));

        return { props: {}};
    } catch(err) {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
        };
    }
}));

export default Chat;