import { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { GoogleAnalytics } from "nextjs-google-analytics";
import Tina from ".tina/components/TinaDynamicProvider";
import "styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GoogleAnalytics trackPageViews strategy="lazyOnload" />
      <Tina>
        <ThemeProvider themes={["cmyk", "night"]} defaultTheme="cmyk">
          <Component {...pageProps} />
        </ThemeProvider>
      </Tina>
    </>
  );
};

export default App;
