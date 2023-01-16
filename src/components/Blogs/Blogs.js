import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "../Blog/Blog";
import { Grid } from "@mui/material";

const Blogs = () => {
    const [blogs, setBlogs] = useState();
    const sendRequest = async () => {
        const res = await axios
            .get("https://fitplus-project-backend.vercel.app/api/blog")
            .catch((err) => console.log(err));
        const data = await res.data;
        return data;
    };
    
    useEffect(() => {
        sendRequest().then((data) => setBlogs(data.blogs));
    }, []);
    console.log(blogs);

    return (
        <div>
            {blogs &&
                blogs.map((blog, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}
                        id={blog._id}
                        isUser={localStorage.getItem("userId") === blog.user._id}
                        activity={blog.activity}
                        date={blog.date}
                        duration={blog.duration}
                        calories={blog.calories}
                        note={blog.note}
                        userName={blog.user.name}
                    />
                ))}
        </div>
    );
};

export default Blogs;
