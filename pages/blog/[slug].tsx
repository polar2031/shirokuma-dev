import { ParsedUrlQuery } from "querystring";
import { GetStaticPaths, GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import { Container } from "@mui/material";
import { useRouter } from "next/router";
import { NotFound } from "@curveball/http-errors/dist";
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
  const { isFallback } = useRouter();

  if (isFallback) {
    return <>Loading</>;
  }

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
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams;
  let title, article;
  try {
    [title, article] = await Promise.all([
      getSiteTitle(),
      getArticle(slug),
    ]).then((res) => {
      return res;
    });
  } catch (err) {
    if (err instanceof NotFound) {
      return { revalidate: 1, notFound: true };
    } else {
      throw err;
    }
  }

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
