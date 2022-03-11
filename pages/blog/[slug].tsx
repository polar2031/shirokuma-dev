import { ParsedUrlQuery } from "querystring";
import { GetStaticPaths, GetStaticProps } from "next";
import Script from "next/script";
import ReactMarkdown from "react-markdown";
import { Container, Link, Skeleton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { NotFound } from "@curveball/http-errors/dist";
import { useEffect, useState } from "react";
import { highlightAll } from "prismjs";
import { getDefaultLayout } from "../../component/layout";
import {
  getArticle,
  getArticleUrlList,
  getSiteTitle,
  IArticle,
} from "../../lib/dataFetching";
import ResponsiveAppBar from "../../component/nav";
import TagList from "../../component/tagList";
import "prismjs/components/prism-bash";

interface IParams extends ParsedUrlQuery {
  slug: string;
}

const Article = (props: { title: string; article: IArticle }) => {
  // useState must not called conditionally
  const [updatedDate, setDate] = useState("");
  useEffect(() => {
    setDate(new Date(Date.parse(props.article.updatedAt)).toLocaleDateString());
  }, [props.article.updatedAt]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      highlightAll();
    }
  }, []);

  const { isFallback } = useRouter();

  if (isFallback) {
    return (
      <>
        <ResponsiveAppBar title={""}></ResponsiveAppBar>
        <Container>
          <Skeleton animation="wave" />
        </Container>
      </>
    );
  }

  return (
    <>
      <Script src="/prism.js" />
      <ResponsiveAppBar title={props.title}></ResponsiveAppBar>
      <Container sx={{ marginY: 1 }}>
        <Typography variant="h3" align="center" sx={{ fontWeight: 700 }}>
          {props.article.title}
        </Typography>
        <TagList tags={props.article.tags}></TagList>
        <Typography>Last Update: {updatedDate}</Typography>
        <ReactMarkdown
          components={{
            a: ({ node, ...props }) => (
              <Link {...props} underline="none"></Link>
            ),
            img: ({ node, ...props }) => (
              <img style={{ maxWidth: "100%" }} {...props} />
            ),
            code: ({ node, inline, className, children, ...props }) => {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <code className={className} {...props}>
                  {children}
                </code>
              ) : (
                <code className={"language-plain"} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {props.article.content}
        </ReactMarkdown>
      </Container>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const [urlList] = await Promise.all([getArticleUrlList()]);
  return {
    paths: urlList.map((url) => ({
      params: { slug: url },
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
