import { ParsedUrlQuery } from "querystring";
import { GetStaticPaths, GetStaticProps } from "next";
import Script from "next/script";
import ReactMarkdown from "react-markdown";
import { Container, Link, Skeleton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { NotFound } from "@curveball/http-errors/dist";
import { useEffect, useState } from "react";
import { NextSeo } from "next-seo";
import { highlightAll } from "prismjs";
import { getDefaultLayout } from "../../component/layout";
import {
  getArticle,
  getArticleUrlList,
  IArticle,
} from "../../lib/dataFetching";
import TagList from "../../component/tagList";
import "prismjs/components/prism-bash";
import { Variable } from "../../site-config";

interface IParams extends ParsedUrlQuery {
  slug: string;
}

const Article = (props: { article: IArticle }) => {
  // useState must not called conditionally
  const [updatedDate, setDate] = useState("");
  useEffect(() => {
    setDate(new Date(Date.parse(props.article.updatedAt)).toLocaleDateString());
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      highlightAll();
    }
  }, []);

  const { isFallback } = useRouter();
  const { asPath } = useRouter();

  if (isFallback) {
    return (
      <>
        <Container>
          <Skeleton animation="wave" />
        </Container>
      </>
    );
  }

  return (
    <>
      <NextSeo
        title={`${props.article.title} | ${Variable.title}`}
        description={props.article.summary}
        openGraph={{
          type: "article",
          title: `${props.article.title}`,
          url: `${Variable.siteUrl}${asPath}`,
        }}
        canonical={`${Variable.siteUrl}${asPath}`}
      />
      <Script src="/prism.js" />
      <Container sx={{ marginY: 1 }}>
        <Typography
          variant="h3"
          component="h1"
          align="center"
          sx={{ fontWeight: 700 }}
        >
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
  let article;
  try {
    [article] = await Promise.all([getArticle(slug)]).then((res) => {
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
      article: article,
    },
    revalidate: false,
  };
};

Article.getLayout = getDefaultLayout;
export default Article;
