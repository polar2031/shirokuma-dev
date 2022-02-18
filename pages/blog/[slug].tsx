import { GetStaticPaths, GetStaticProps } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { fetchAPI } from '../../lib/api'
import ReactMarkdown from 'react-markdown'
import { Container } from '@mui/material'
import { getDefaultLayout } from '../../component/layout'

interface IParams extends ParsedUrlQuery {
    slug: string
}

const Article = (props: { article: {title: string, content: string}}) => {
  return (
      <Container>
      <ReactMarkdown children={props.article.content}></ReactMarkdown>
      </Container>
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
        article: {
            title: articlesRes.data[0].attributes.title,
            content: articlesRes.data[0].attributes.content,
        }
    },
    revalidate: 1,
  }
}

Article.getLayout = getDefaultLayout
export default Article
