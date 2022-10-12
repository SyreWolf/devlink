import Head from 'next/head'
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import { useRouter } from 'next/router';

//This function generates the links of the Layout Component => receives (children components, head title and head description) => returns the structure
const Layout = ({ children, title = '?', description = '?' }) => {
  const router = useRouter();
  //Returns the structure
  return (
    <div className="flex flex-row">
      <Sidebar/>
      <div className="w-full h-screen overflow-y-hidden">
        <Header/>
        <Head>
          <title>Devlink | {title}</title>
          <meta name="description" content={description} />
        </Head>
        <main className={`w-full h-full flex flex-row items-end justify-start relative px-4 overflow-y-hidden`}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
