import { ParsedUrlQuery } from "querystring";
import { GetStaticPaths, GetStaticProps } from "next";
import ReactMarkdown from "react-markdown";
import { Container, Link, Skeleton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { NotFound } from "@curveball/http-errors/dist";
import { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNight } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { getDefaultLayout } from "../../component/layout";
import {
  getArticle,
  getArticleUrlList,
  getSiteTitle,
  IArticle,
} from "../../lib/dataFetching";
import ResponsiveAppBar from "../../component/nav";
import TagList from "../../component/tagList";

interface IParams extends ParsedUrlQuery {
  slug: string;
}

const Article = (props: { title: string; article: IArticle }) => {
  // useState must not called conditionally
  const [updatedDate, setDate] = useState("");
  useEffect(() => {
    setDate(new Date(Date.parse(props.article.updatedAt)).toLocaleDateString());
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
              return (
                <SyntaxHighlighter
                  style={tomorrowNight}
                  customStyle={
                    inline
                      ? {
                          display: "inline-grid",
                          padding: "0em .2em",
                          margin: "0",
                        }
                      : {}
                  }
                  language={match ? match[1] : "plaintext"}
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
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
