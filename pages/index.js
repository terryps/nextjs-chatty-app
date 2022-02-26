import { authenticate } from "middlewares/authenticate";

import wrapper from 'redux/index';
import { setUserId, setLoggedIn, setUserInfo } from 'redux/actions/authenticateActions';

import Layout from "components/common/Layout";
import LoginForm from 'components/forms/LoginForm';
import HomeSection from 'components/home/HomeSection';

const Home = ({ isLoggedIn }) => {
    return (
        <Layout>
            { 
                isLoggedIn ? <HomeSection /> : <LoginForm />
            }
        </Layout>
    );
}

export const getServerSideProps = wrapper.getServerSideProps(store => authenticate(async (context) => {
  const { req } = context;

  const userId = req?.cookieUserId;

  if(!userId) {
    return { props: { isLoggedIn: false, } };
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
    store.dispatch(setUserId(userId));
    store.dispatch(setLoggedIn(true));
    store.dispatch(setUserInfo(userData));

    return { props: { isLoggedIn: true } };
  } catch(err) {
    return { props: { isLoggedIn: false } };
  }
}));

export default Home;