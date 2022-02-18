import { GetStaticProps } from 'next'
import { getDefaultLayout } from '../component/layout'

const Home = (props: {  }) => {
  return (
    <></>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // Run API calls in parallel
  const [] = await Promise.all([])

  return {
    props: {},
    revalidate: 1,
  }
}

Home.getLayout = getDefaultLayout
export default Home
