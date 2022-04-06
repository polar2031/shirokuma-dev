import path from "path";
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
import useSWR from "swr";
import { getDefaultLayout } from "../component/layout";
import { getArticleListByPage, getArticlePageSize } from "../lib/dataFetching";
import TagList from "../component/tagList";
import { SEO, Variable } from "../site-config";

const Blog = () => {
  const { query, asPath, pathname } = useRouter();

  let currentPage: number;
  currentPage = parseInt(query.page as string);
  currentPage = isNaN(currentPage) ? 1 : currentPage;

  const { data, error } = useSWR("getArticleListByPage", () => {
    return Promise.all([
      getArticleListByPage(currentPage),
      getArticlePageSize(),
    ]);
  });

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const articles = data[0];
  const pageSize = data[1];

  return (
    <>
      <NextSeo
        noindex={true}
        title={`文章列表 | ${Variable.title} - page ${currentPage}`}
        description={`文章列表 - page ${currentPage}`}
        openGraph={{
          title: `文章列表`,
          url: path.join(SEO.canonical, asPath),
        }}
        canonical={path.join(SEO.canonical, asPath)}
      />
      <main>
        <Container sx={{ marginY: 2 }}>
          <Grid container spacing={2} sx={{ marginY: 2 }}>
            {articles.map((article) => {
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
              count={pageSize}
              page={currentPage}
              shape="rounded"
              renderItem={(item) => (
                <PaginationItem
                  component={MuiLink}
                  href={`${pathname}${
                    item.page === 1 ? "" : `?page=${item.page}`
                  }`}
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

Blog.getLayout = getDefaultLayout;
export default Blog;
