import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import PuffLoader from "react-spinners/PuffLoader";
import { useState, useEffect } from 'react'

//This function generates the links of the Layout Component => receives (children components, head title and head description) => returns the structure
const Layout = ({ children, title = '?', description = '?' }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000)
  }, []);

  //Returns the structure
  return (
    
      <div className="flex flex-row">
        {loading ? 
          <div className="w-screen h-screen relative">
            <div className="absolute top-[43%] left-[46%] translate-x-[-50%] translate-y-[-50%]">
              <PuffLoader color="#E0E0E0" loading={loading} size={100} aria-label="Loading Spinner" data-testid="loader"/>
            </div>
          </div>
        :
          <>
            <Sidebar/>
            <div className="w-full h-screen overflow-y-hidden">
              <Header/>
              <main className={`w-full h-full flex flex-row items-end justify-start relative px-4 overflow-y-hidden`}>
                {children}
              </main>
            </div>
          </>
        }
      </div>
  );
}

export default Layout;
