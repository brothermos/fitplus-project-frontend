import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../../store";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Auth = () => {

    // พาไป path ที่กำหนด
    const naviagte = useNavigate();

    // เรียกใช้งาน dispath
    const dispath = useDispatch();

    // state เพื่อเก็บค่าตอนลงทะเบียน
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password: "",
    });

    // state ลงทะเบียน
    const [isSignup, setIsSignup] = useState(false);

    // เปลี่ยนค่าใน form
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    // ส่งค่าไป backend
    const sendRequest = async (type = "login") => {
        // axios.post ไปหา backend path
        const res = await axios
            .post(`https://fitplus-project-backend.vercel.app/api/user/${type}`, {
                name: inputs.name,
                email: inputs.email,
                password: inputs.password,
            })
            .catch((err) => console.log(err));

        const data = await res.data;
        console.log(data);
        return data;
    };

    // submit button
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        if (isSignup) {
            // register
            sendRequest("signup")
                .then((data) => localStorage.setItem("userId", data.user._id))
                // update authActions
                .then(() => dispath(authActions.login()))
                .then(() => naviagte("/blogs"));
        } else {
            sendRequest()
                .then((data) => localStorage.setItem("userId", data.user._id))
                .then(() => dispath(authActions.login()))
                .then(() => naviagte("/blogs"));
        }
    };
    return (
        <div className="auth-box">
            <form onSubmit={handleSubmit}>
                <Box
                    maxWidth={400}
                    display="flex"
                    flexDirection={"column"}
                    alignItems="center"
                    justifyContent={"center"}
                    boxShadow="10px 10px 20px #ccc"
                    padding={3}
                    margin="auto"
                    marginTop={13}
                    borderRadius={3}
                >
                    <Typography variant="h2" padding={3} textAlign="center" color="#4158D0">
                        {isSignup ? "Signup" : "Login"}
                    </Typography>
                    {isSignup && (
                        <TextField
                            name="name"
                            onChange={handleChange}
                            value={inputs.name}
                            placeholder="Name"
                            margin="normal"
                        />
                    )}{" "}
                    <TextField
                        name="email"
                        onChange={handleChange}
                        value={inputs.email}
                        type={"email"}
                        placeholder="Email"
                        margin="normal"
                    />
                    <TextField
                        name="password"
                        onChange={handleChange}
                        value={inputs.password}
                        type={"password"}
                        placeholder="Password"
                        margin="normal"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ borderRadius: 3, marginTop: 3 }}
                        color="warning"
                    >
                        Submit
                    </Button>
                    <Button
                        onClick={() => setIsSignup(!isSignup)}
                        sx={{ borderRadius: 3, marginTop: 3 }}
                    >
                        Change To {isSignup ? "Login" : "Signup"}
                    </Button>
                </Box>
            </form>
        </div>
    );
};

export default Auth;
