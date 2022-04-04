import { GetServerSideProps } from "next";
import Link from "next/link";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Link as MuiLink,
  Pagination,
  PaginationItem,
  Typography,
} from "@mui/material";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { getDefaultLayout } from "../component/layout";
import {
  getArticleListByPage,
  getArticlePageSize,
  getSiteTitle,
  IArticleList,
} from "../lib/dataFetching";
import ResponsiveAppBar from "../component/nav";
import TagList from "../component/tagList";
import { Variable } from "../site-config";

const Blog = (props: {
  title: string;
  articles: IArticleList;
  pageSize: number;
  currentPage: number;
}) => {
  const { asPath } = useRouter();
  return (
    <>
      <NextSeo
        noindex={true}
        title={`文章列表 | ${props.title} - page ${props.currentPage}`}
        description={`文章列表 - page ${props.currentPage}`}
        openGraph={{
          title: `文章列表`,
          url: `${Variable.siteUrl}${asPath}`,
        }}
        canonical={`${Variable.siteUrl}${asPath}`}
      />
      <ResponsiveAppBar title={props.title}></ResponsiveAppBar>
      <main>
        <Container sx={{ marginY: 2 }}>
          <Grid container spacing={2} sx={{ marginY: 2 }}>
            {props.articles.map((article) => {
              return (
                <Grid item xs={12} md={6} key={article.canonicalUrl}>
                  <Card sx={{ height: "250px" }}>
                    <CardContent sx={{ height: "200px" }}>
                      {/* title */}
                      <Typography component="h2" variant="h5">
                        {article.title}
                      </Typography>

                      {/* list tag */}
                      <TagList tags={article.tags}></TagList>

                      {/* summary */}
                      <Typography
                        variant="subtitle1"
                        paragraph
                        sx={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 2,
                          overflow: "hidden",
                        }}
                      >
                        {article.summary}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: "end" }}>
                      <Link href={`/blog/${article.canonicalUrl}`} passHref>
                        <MuiLink underline="none">Read more...</MuiLink>
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginY: 2,
            }}
          >
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
          </Box>
        </Container>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
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
