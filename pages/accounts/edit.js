import wrapper from "redux/index";
import { setLoggedIn, setUserInfo } from "redux/actions/authenticateActions";
import { authenticate } from "middlewares/authenticate";
import EditForm from "components/forms/EditForm";

const EditPage = () => {
    return (
        <EditForm />
    );
}

export const getServerSideProps = wrapper.getServerSideProps(store => authenticate(async (context) => {
    const { req } = context;

    const userId = req?.cookieUserId;

    if(!userId) {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            }
        };
    }

    try {
        const response = await fetch("http://localhost:3000/api/user", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({userId: userId}),
        });
        const data = await response.json();

        if(!response.ok) {
            throw data.message;
        }
        const { userData } = data;
        store.dispatch(setUserInfo(userData));
        store.dispatch(setLoggedIn(true));

        return { props: {} };
    } catch(err) {
        return { 
            redirect: {
                permanent: false,
                destination: "/",
            } 
        };
    }
}));
export default EditPage;