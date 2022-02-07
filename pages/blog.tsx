import { GetStaticProps } from 'next'
import { fetchAPI } from "../lib/api"
import ResponsiveAppBar from '../component/nav'
import { Box, Container, Link } from '@mui/material'

interface Article {
  id: string
  attributes: {
    CanonicalUrl: string
  }
}

const Home = (props: { title: string, articles: Article[] }) => {
  return (
    <>
      <ResponsiveAppBar title={props.title}></ResponsiveAppBar>
      <Container>
        {props.articles.map(article => {
          return (
            <Box m={1} key={article.attributes.CanonicalUrl}>
              <Link href={'/blog/' + article.attributes.CanonicalUrl} underline="none">
              {article.attributes.CanonicalUrl}
              </Link>
            </Box>
          )
        })}
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // Run API calls in parallel
  const [site, page] = await Promise.all([
    fetchAPI("/site", {
      populate: "*",
    }),
    fetchAPI("/articles", {
      fields: ["title", "CanonicalUrl"],
      pagination: {
        pageSize: 10,
      }
    })
  ])

  return {
    props: {
      title: site.data.attributes.title,
      articles: page.data,
    },
    revalidate: 1,
  }
}

export default Home
