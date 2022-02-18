import { ReactElement, ReactNode } from 'react'
import ResponsiveAppBar from './nav'

type Props = {
  children: ReactNode;
};

export default function Layout({children}:Props) {

  return (
    <>
      <ResponsiveAppBar></ResponsiveAppBar>
      {children}
    </>
  )
}

export function getDefaultLayout(page: ReactElement) {
  return (
    <Layout>{page}</Layout>
  )
}