import { ReactElement, ReactNode } from "react";
import Footer from "./footer";
import ResponsiveAppBar from "./nav";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="main-content-wrapper">
      <ResponsiveAppBar></ResponsiveAppBar>
      {children}
      <Footer></Footer>
    </div>
  );
}

export function getDefaultLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
}
