import { logout } from "middlewares/logout";

function LogOut() {
  return (<></>);
}

export default LogOut;

export const getServerSideProps = logout(async ({req, res}) => {
  return {
    redirect: {
      permanent: false,
      destination: "/",
    }
  };
});