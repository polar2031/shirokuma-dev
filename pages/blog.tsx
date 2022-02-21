import { GetServerSideProps } from "next";
import Link from "next/link";
import {
  Box,
  Container,
  Link as MuiLink,
  Pagination,
  PaginationItem,
} from "@mui/material";
import { getDefaultLayout } from "../component/layout";
import {
  getArticleListByPage,
  getArticlePageSize,
  getSiteTitle,
  IArticleList,
} from "../lib/dataFetching";
import ResponsiveAppBar from "../component/nav";

const Blog = (props: {
  title: string;
  articles: IArticleList;
  pageSize: number;
  currentPage: number;
}) => {
  return (
    <>
      <ResponsiveAppBar title={props.title}></ResponsiveAppBar>
      <Container>
        {props.articles.map((article) => {
          return (
            <Box m={1} key={article.canonicalUrl}>
              <MuiLink
                component={Link}
                href={`/blog/${article.canonicalUrl}`}
                underline="none"
              >
                {article.title}
              </MuiLink>
            </Box>
          );
        })}
        <Pagination
          count={props.pageSize}
          page={props.currentPage}
          shape="rounded"
          renderItem={(item) => (
            <PaginationItem
              component={MuiLink}
              href={`/blog${item.page === 1 ? "" : `?page=${item.page}`}`}
              {...item}
            />
          )}
        />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Run API calls in parallel
  let page: number;
  try {
    page = parseInt(context.query.page as string);
    page = isNaN(page) ? 1 : page;
  } catch {
    page = 1;
  }

  const [title, articleList, pageSize] = await Promise.all([
    getSiteTitle(),
    getArticleListByPage(page),
    getArticlePageSize(),
  ]);

  return {
    props: {
      title: title,
      articles: articleList,
      pageSize: pageSize,
      currentPage: page,
    },
  };
};

Blog.getLayout = getDefaultLayout;
export default Blog;
