import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { StateProvider } from "./context/context";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Video from "./pages/Video";
import Saves from "./pages/Saves";
import Images from "./pages/Images";
import Comments from "./components/Comments";
import SideBar from "./components/SideBar";
// import AOS from 'aos';
// import 'aos/dist/aos.css';

const App = () => {
  // useEffect(() => {
  //   AOS.init();
  // }, [])
  return (
    <>
      <StateProvider>
        <BrowserRouter>
          <div className="flex">
            <SideBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/back" element={<Comments />} />
              <Route path="/videos" element={<Video />} />
              <Route path="/images" element={<Images />} />
              <Route path="/saves" element={<Saves />} />
            </Routes>
          </div>
        </BrowserRouter>
      </StateProvider>
    </>
  );
};

export default App;
