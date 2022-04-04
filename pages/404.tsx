import { Container, Link, Typography } from "@mui/material";
import { NextSeo } from "next-seo";
import { getDefaultLayout } from "../component/layout";

const Error404 = () => {
  return (
    <>
      <NextSeo noindex={true} />
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

Error404.getLayout = getDefaultLayout;
export default Error404;
