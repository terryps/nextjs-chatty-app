import Layout from "components/common/Layout";
import wrapper from "redux/index";
import 'styles/style.scss';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default wrapper.withRedux(MyApp);
