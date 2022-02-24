import Router from "next/router";
import { authenticate } from "middlewares/authenticate";
import wrapper from "redux/index";
import { setUserInfo, setHostInfo, setUserId } from "redux/actions/authenticateActions";
import ChatSection from "components/chat/ChatSection";

const Chat = () => {
    return (
        <div>
            <main>
                <ChatSection />
            </main>
        </div>
    );
}

Chat.getInitialProps = wrapper.getInitialPageProps(store => authenticate(async (context) => {
    const { req, res, query } = context;
    const userId = req?.cookieUserId;
    const hostName = query?.username;

    if(!userId) {
        if(res) {
            res.writeHead(307, { Location: "/"});
            res.end();
        } else {
            Router.replace("/");
        }
        return {};
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

        store.dispatch(setUserId(userId));
        store.dispatch(setUserInfo(user.userData));
        store.dispatch(setHostInfo(host.userData));

        return {};
    } catch(err) {
        if(res) {
            res.writeHead(307, { Location: "/"});
            res.end();
        } else {
            Router.replace("/");
        }
        return {};
    }
}));

export default Chat;