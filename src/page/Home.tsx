import { Button, Skeleton, Stack, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Clear";

import { X } from "lucide-react";
import React, { useState } from "react";
import { Header } from "../components/Header";
// import "./App.css";

import { RootState, useAppDispatch } from "../store/store";
import { fetchPosts } from "../store/postsSlice";
import { useSelector } from "react-redux";
import { PostSkeleton } from "../components/PostSkeleton";
import { Post } from "../components/Post";
import { useAutoAnimate } from "@formkit/auto-animate/react";

//!
function Home() {
   const dispatch = useAppDispatch();
   const { posts, status } = useSelector((state: RootState) => state.postsSlice);
   const [searchValue, setSearchValue] = useState("");
   const [animate] = useAutoAnimate();

   const isAuth = useSelector((state: RootState) => state.auth.user);

   React.useEffect(() => {
      dispatch(fetchPosts());
   }, []);

   const skeletons = [...new Array(3)].map((_, index) => <PostSkeleton key={index} />);
   const items = posts.filter((post) => post.title.toLowerCase().includes(searchValue.toLowerCase()));

   return (
      <>
         <div className="mb-5 relative ">
            <TextField value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Поиск..." variant="filled" fullWidth className="bg-slate-50" />
            <X className="absolute top-6 right-1 cursor-pointer opacity-60 hover:opacity-100 transition" />
         </div>

         <div className="flex gap-[60px]">
            <div className="flex-1">
               <h2 className="mb-5 text-2xl font-bold">Популярные посты</h2>
               <div ref={animate} className="grid grid-cols-1 gap-10 ">
                  {status === "loading" ? skeletons : items.map((post) => <Post {...post} key={post.id} isEditable={true} />)}
               </div>
            </div>

            <aside className="w-[300px]">
               <h2 className="mb-5 text-2xl font-bold">Вы вошли как: </h2>
               <div className="flex gap-3">
                  <img src="/noavatar.png" className="w-20 h-20" />
                  <span className="font-bold">{isAuth ? isAuth.fullName : "Гость"}</span>
               </div>
            </aside>
         </div>
      </>
   );
}

export default Home;
