import { Link } from "react-router-dom";
import './Navbar.css'
import { useContext } from "react";
import { Context } from "../../context/Context";

const Navbar = () => {
    const {user,dispatch} = useContext(Context);
    const handleLogout =()=>{
        dispatch({type:"LOGOUT"})
    }
    const PF = "http://localhost:5000/images/"

    return (
        <div className='top'>
            <div className="topLeft">
                <i className="topIcon fab fa-facebook-square"></i>
                <i className="topIcon fab fa-twitter-square"></i>
                <i className="topIcon fab fa-instagram-square"></i>
                <i className="topIcon fab fa-pinterest"></i>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        <Link className='link' to="/" >Home</Link>
                    </li>
                    <li className="topListItem">
                    <Link className='link' to="/about" >About</Link>
                    </li>
                    <li className="topListItem">
                        Contact
                    </li>
                    <li className="topListItem">
                        <Link className='link' to="/write" >Write</Link>
                    </li>

                     <li className="topListItem" onClick={handleLogout}>{user && "Logout"}</li>

                </ul>
            </div>
            <div className="topRight">
                {
                    user ? (
                        <Link className="link" to="/settings">
                            <img className="topImg"
                                src={PF + user.ProfilePic}
                                alt='' />
                        </Link>

                    ) : (
                        <ul className="topList">
                            <li className="topListItem">
                                <Link className="link" to="/login">
                                    Login
                                </Link>
                            </li>
                            <li className="topListItem">
                                <Link className="link" to="/register">
                                    Register
                                </Link>
                            </li>
                        </ul>
                    )}
                <i className="topSearchIcon fas fa-search"></i>
            </div>
        </div>
    );
}







export default Navbar
