import { GetStaticProps } from "next";
import { getDefaultLayout } from "../component/layout";
import ResponsiveAppBar from "../component/nav";
import { getSiteTitle } from "../lib/dataFetching";

const Home = (props: { title: string }) => {
  return (
    <>
      <ResponsiveAppBar title={props.title}></ResponsiveAppBar>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Run API calls in parallel
  const [title] = await Promise.all([getSiteTitle()]);
  return {
    props: {
      title: title,
    },
    revalidate: 1,
  };
};

Home.getLayout = getDefaultLayout;
export default Home;
