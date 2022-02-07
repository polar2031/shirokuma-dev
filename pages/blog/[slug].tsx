import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import ResponsiveAppBar from '../../component/nav'
import { fetchAPI } from '../../lib/api'
import ReactMarkdown from 'react-markdown'
import { Container } from '@mui/material'

interface IParams extends ParsedUrlQuery {
    slug: string
}

const Article = (props: { title: string , article: {title: string, content: string}}) => {
  return (
      <>
      <ResponsiveAppBar title={props.title}></ResponsiveAppBar>
      <Container>
      <ReactMarkdown children={props.article.content}></ReactMarkdown>
      </Container>
      </>
  )
}

export const getStaticPaths: GetStaticPaths = async() => {
  const articlesRes = await fetchAPI("/articles", { fields: ["CanonicalUrl"] })

  return {
    paths: articlesRes.data.map((article: { attributes: { CanonicalUrl: string } }) => ({
      params: {
        slug: article.attributes.CanonicalUrl,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as IParams
  const [siteRes, articlesRes] = await Promise.all([
    fetchAPI("/site", {
      populate: "*",
    }),
    fetchAPI("/articles", {
      filters: {
        CanonicalUrl: {
            $eq: slug
        },
      },
      fields: ["title", "content"],
    })
  ])

  return {
    props: {
        title: siteRes.data.attributes.title,
        article: {
            title: articlesRes.data[0].attributes.title,
            content: articlesRes.data[0].attributes.content,
        }
    },
    revalidate: 1,
  }
}

export default Article
