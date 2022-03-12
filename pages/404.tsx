import { Container, Link, Typography } from "@mui/material";
import { GetStaticProps } from "next";
import { getDefaultLayout } from "../component/layout";
import ResponsiveAppBar from "../component/nav";
import { getSiteTitle } from "../lib/dataFetching";

const Error404 = (props: { title: string }) => {
  return (
    <>
      <ResponsiveAppBar title={props.title}></ResponsiveAppBar>
      <Container sx={{ marginY: 1 }}>
        <Typography
          variant="h3"
          component="h1"
          align="center"
          sx={{ fontWeight: 700 }}
        >
          {"404"}
        </Typography>
        <Typography align="center">
          The page you are looking for does not exist
        </Typography>
        <Typography align="center">
          <Link href="/">Return to index</Link>
        </Typography>
      </Container>
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
    revalidate: false,
  };
};

Error404.getLayout = getDefaultLayout;
export default Error404;
