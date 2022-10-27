import { Hero } from "components/blocks/hero";
import { Layout } from "components/layout/layout";

const FourOhFour = () => {
  return (
    <Layout>
      <Hero
        data={{
          headline: "404",
          text: "Página no encontrada",
          type: "center",
        }}
      />
    </Layout>
  );
};

export default FourOhFour;
