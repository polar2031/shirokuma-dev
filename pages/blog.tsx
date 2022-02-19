import { GetStaticProps } from "next";
import { Box, Container, Link } from "@mui/material";
import { fetchAPI } from "../lib/api";
import { getDefaultLayout } from "../component/layout";

interface Article {
  id: string;
  attributes: {
    CanonicalUrl: string;
  };
}

const Blog = (props: { articles: Article[] }) => {
  return (
    <Container>
      {props.articles.map((article) => {
        return (
          <Box m={1} key={article.attributes.CanonicalUrl}>
            <Link
              href={"/blog/" + article.attributes.CanonicalUrl}
              underline="none"
            >
              {article.attributes.CanonicalUrl}
            </Link>
          </Box>
        );
      })}
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  // Run API calls in parallel
  const [page] = await Promise.all([
    fetchAPI("/articles", {
      fields: ["title", "CanonicalUrl"],
      pagination: {
        pageSize: 10,
      },
    }),
  ]);

  return {
    props: {
      articles: page.data,
    },
    revalidate: 1,
  };
};

Blog.getLayout = getDefaultLayout;
export default Blog;
