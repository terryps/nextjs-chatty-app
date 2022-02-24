import wrapper from "redux/index";
import 'styles/globals.css';
import 'styles/style.scss';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp);
