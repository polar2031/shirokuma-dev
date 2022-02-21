import { ParsedUrlQuery } from "querystring";
import { GetStaticPaths, GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import { Container } from "@mui/material";
import { getDefaultLayout } from "../../component/layout";
import {
  getArticle,
  getArticleList,
  getSiteTitle,
} from "../../lib/dataFetching";
import ResponsiveAppBar from "../../component/nav";

interface IParams extends ParsedUrlQuery {
  slug: string;
}

const Article = (props: {
  title: string;
  article: { title: string; content: string };
}) => {
  return (
    <>
      <ResponsiveAppBar title={props.title}></ResponsiveAppBar>
      <Container>
        <ReactMarkdown>{props.article.content}</ReactMarkdown>
      </Container>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const [articleList] = await Promise.all([getArticleList()]);
  return {
    paths: articleList.map((article) => ({
      params: { slug: article.canonicalUrl },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;
  const [title, article] = await Promise.all([
    getSiteTitle(),
    getArticle(slug),
  ]);

  return {
    props: {
      title: title,
      article: article,
    },
    revalidate: 1,
  };
};

Article.getLayout = getDefaultLayout;
export default Article;
