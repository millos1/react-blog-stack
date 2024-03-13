import Navbar from "./components/Navbar/Navbar";
import Register from "./pages/register/Register";
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Write from './pages/write/Write'
import Settings from './pages/settings/Settings'
import Single from './pages/single/Single'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import About from "./pages/about/About";








function App() {
  const {user} = useContext(Context);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/about" element={<About />}></Route>
        <Route exact path="/register" element={user ? <Home /> : <Register />}></Route>
        <Route exact path="/login" element={user ? <Home /> : <Login />}></Route>
        <Route exact path="/write" element={user ? <Write /> : <Register />}></Route>
        <Route exact path="/settings" element={user ? <Settings /> : <Register />}></Route>
        <Route exact path="/post/:postId" element={<Single />}></Route>
      </Routes>
      


    </Router>
  );
}

export default App;
