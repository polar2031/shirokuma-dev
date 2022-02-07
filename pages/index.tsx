import { GetStaticProps } from 'next'
import { fetchAPI } from "../lib/api"
import ResponsiveAppBar from '../component/nav'

const Home = (props: { title: string }) => {
  return (
    <ResponsiveAppBar title={props.title}></ResponsiveAppBar>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // Run API calls in parallel
  const [site] = await Promise.all([
    fetchAPI("/site", {
      populate: "*",
    }),
  ])

  return {
    props: { title: site.data.attributes.title },
    revalidate: 1,
  }
}

export default Home
