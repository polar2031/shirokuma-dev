import { GetServerSideProps } from "next";
import Link from "next/link";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  Grid,
  Link as MuiLink,
  Pagination,
  PaginationItem,
  Stack,
  Typography,
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
                      <Stack
                        direction="row"
                        spacing={1}
                        onMouseDown={(event) => event.stopPropagation()}
                        onClick={(event) => {
                          event.stopPropagation();
                        }}
                      >
                        {article.tags.map((tag) => {
                          return (
                            <Link href={`/tags/${tag}`} key={tag} passHref>
                              <Chip
                                label={tag}
                                size="small"
                                key={tag}
                                component={MuiLink}
                              />
                            </Link>
                          );
                        })}
                      </Stack>

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
