import Header from "./components/Header/Header";
import Blogs from "./components/Blogs/Blogs";
import UserBlogs from "./components/UserBlogs/UserBlogs";
import BlogDetail from "./components/BlogDetail/BlogDetail";
import AddBlog from "./components/AddBlog/AddBlog";
import Home from "./components/Home/Home";
import Auth from './components/Auth/Auth'
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";

function App() {
    const dispath = useDispatch();

    const isLoggedIn = useSelector((state) => state.isLoggedIn);
    console.log(isLoggedIn);

    useEffect(() => {
        if (localStorage.getItem("userId")) {
            dispath(authActions.login());
        }
    }, [dispath]);

    return (
        <React.Fragment>
            <header>
                <Header />
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    {!isLoggedIn ? (
                        <Route path="/auth" element={<Auth />} />
                    ) : (
                        <>
                            <Route path="/blogs" element={<Blogs />} />
                            <Route path="/blogs/add" element={<AddBlog />} />
                            <Route path="/myBlogs" element={<UserBlogs />} />
                            <Route path="/myBlogs/:id" element={<BlogDetail />} />{" "}
                        </>
                    )}
                </Routes>
            </main>
        </React.Fragment>
    );
}

export default App;
