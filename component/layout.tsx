import { ReactElement, ReactNode } from "react";
import Footer from "./footer";

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <div className="main-content-wrapper">
        {children}
        <div className="footer">
          <Footer></Footer>
        </div>
      </div>
    </>
  );
}

export function getDefaultLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
}
