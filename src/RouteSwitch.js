import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/home";
import NavbarComponent from "./components/navbar";
import BlogPost from "./components/blogPost";
import CreatePost from "./components/createPost";
import EditPost from "./components/editPost";
import Login from "./components/login";
import { AuthContext } from "./Contexts/AuthContext";
import "../src/styling/main.css"
import { useState } from "react";
import ErrorPage from "./components/errorPage";

const RouteSwitch = () => {

    const [user, setUser] = useState('');
    
    if(user){
        localStorage.setItem('isLoggedIn', true)
    }else{
        localStorage.clear();
    };

    return (
        <BrowserRouter>       
        <div className="mainContainerNav">
        <AuthContext.Provider value = {{user, setUser}}>
        <NavbarComponent />
            <Routes>
                <Route path = "/" element = { <Homepage />} />
                <Route path = "/posts/:postId" element = {<BlogPost /> } />
                <Route path = "/create-post" element = {<CreatePost /> } />
                <Route path = "/posts/:postId/edit" element = {<EditPost />} />
                <Route path = "/login" element = {<Login />} />
                <Route path = "*" element={<ErrorPage />} />
            </Routes>
        </AuthContext.Provider>
        </div>
        </BrowserRouter>
    )
};

export default RouteSwitch;