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
  Skeleton,
  Typography,
} from "@mui/material";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getDefaultLayout } from "../component/layout";
import {
  getArticleListByPage,
  getArticlePageSize,
  IArticleList,
} from "../lib/dataFetching";
import TagList from "../component/tagList";
import { SEO, Variable } from "../site-config";

const Blog = () => {
  const { query, asPath, pathname, isReady } = useRouter();
  let currentPage: number | undefined;
  currentPage = parseInt(query.page as string);
  currentPage = isNaN(currentPage) ? 1 : currentPage;

  const { data, error } = useSWR(
    // wait router
    isReady ? "getArticleListByPage" : null,
    () => {
      return Promise.all([
        getArticleListByPage(currentPage),
        getArticlePageSize(),
      ]);
    }
  );

  if (error) return <div>Failed to load</div>;

  return (
    <>
      <NextSeo
        noindex={true}
        title={`文章列表 | ${Variable.title} - page ${
          isReady ? currentPage : ""
        }`}
        description={`文章列表 - page ${isReady ? currentPage : ""}`}
        openGraph={{
          title: `文章列表`,
          url: new URL(pathname, SEO.canonical).href,
        }}
        canonical={new URL(pathname, SEO.canonical).href}
      />
      <main>
        <Container sx={{ marginY: 2 }}>
          <Grid container spacing={2} sx={{ marginY: 2 }}>
            {data ? renderGridItem(data[0]) : renderGridItem([], true)}
          </Grid>
          {data ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginY: 2,
              }}
            >
              <Pagination
                count={data[1]}
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
          ) : (
            <></>
          )}
        </Container>
      </main>
    </>
  );
};

const renderGridItem = (articles: IArticleList, sketch = false) => {
  if (sketch) {
    articles = [];
    for (let i = 0; i < 4; i++) {
      articles.push({
        title: "",
        canonicalUrl: "",
        tags: [""],
        summary: "",
      });
    }
  }
  return (
    <Grid container spacing={2} sx={{ marginY: 2 }}>
      {articles.map((article, index) => {
        return (
          <Grid item xs={12} md={6} key={sketch ? index : article.canonicalUrl}>
            <Card sx={{ height: "250px" }}>
              <CardContent sx={{ height: "200px" }}>
                {/* title */}
                <Typography component="h2" variant="h5">
                  {sketch ? <Skeleton width={"20ch"} /> : article.title}
                </Typography>

                {/* list tag */}
                {sketch ? (
                  <Skeleton width={"5ch"} />
                ) : (
                  <TagList tags={article.tags}></TagList>
                )}

                {/* summary */}

                {sketch ? (
                  // overflow option will cause some issue with skeleton
                  <Typography variant="subtitle1" paragraph>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                  </Typography>
                ) : (
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
                )}
              </CardContent>
              <CardActions sx={{ justifyContent: "end" }}>
                {sketch ? (
                  <Skeleton width={"12ch"} />
                ) : (
                  <Link href={`/blog/${article.canonicalUrl}`} passHref>
                    <MuiLink underline="none">Read more...</MuiLink>
                  </Link>
                )}
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

Blog.getLayout = getDefaultLayout;
export default Blog;
