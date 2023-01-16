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
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {blogs &&
                    blogs.map((blog, index) => (
                        <Grid item xs={2} sm={2} md={4} key={index}>
                            <Blog
                                id={blog._id}
                                isUser={localStorage.getItem("userId") === blog.user._id}
                                activity={blog.activity}
                                date={blog.date}
                                duration={blog.duration}
                                calories={blog.calories}
                                note={blog.note}
                                userName={blog.user.name}
                            />
                        </Grid>
                    ))}
            </Grid>
        </div>
    );
};

export default Blogs;
