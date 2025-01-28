import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import Home from "./page/Home";

import { RootState, useAppDispatch } from "./store/store";
import { useSelector } from "react-redux";
import FullPost from "./page/FullPost";
import NotFound from "./page/NotFount";
import Auth from "./page/Auth";
import AddPost from "./page/AddPost";
import React from "react";
import { fetchAuth } from "./store/authSlice";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
   /* w-4/5 - размер контейнера типо как max-w-[1200px], 
<!--section -  wrapper для всего приложения, теперь нужно сделать header --> */

   const dispatch = useAppDispatch();
   const [isLoading, setIsLoading] = React.useState(false);

   React.useEffect(() => {
      setIsLoading(true);
      dispatch(fetchAuth());
      setIsLoading(false);
   }, []);

   if (isLoading) {
      return (
         <div className="bg-white max-w-[1200px] mx-auto rounded-xl shadow-2xl shadow-black mt-14">
            <Header />
            <main className="p-10 mb-5">
               <Skeleton height={40} count={5} />
            </main>
         </div>
      );
   }

   return (
      <div className="bg-white max-w-[1200px] mx-auto rounded-xl shadow-2xl shadow-black mt-14">
         <Header />

         <main className="p-10 mb-5">
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/posts/:id" element={<FullPost />} />
               <Route path="/add-post" element={<AddPost />} />
               <Route path="/add-post/:id" element={<AddPost />} />

               <Route path="/login" element={<Auth />} />
               <Route path="/register" element={<Auth />} />

               <Route path="*" element={<NotFound />} />
            </Routes>
         </main>
      </div>
   );
}

export default App;
