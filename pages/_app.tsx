import { AppProps } from "next/app.js";
import Tina from "../.tina/components/TinaDynamicProvider";
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Tina>
      <Component {...pageProps} />
    </Tina>
  );
};

export default App;
