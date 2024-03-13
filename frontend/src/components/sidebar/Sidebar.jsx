import './Sidebar.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';


export default function Sidebar() {
    const [cats, setCats] = useState([]);

    useEffect(()=>{
        const fetchCats = async() => {
            const res = await axios.get("/categories");
            setCats(res.data)
        }
        fetchCats()
    },[])



    return (
        <div className="sidebar">
            <div className='sidebarItem'>
            <span className='sidebarTitle'> About Me</span>
            </div>
            <div>
            <img className='sidebarImg' src="https://i.pinimg.com/736x/0a/53/d4/0a53d49e7527b09f3ec8c1d221da45d8.jpg" alt='' />
            </div>
           
            <p> Lorem ipsum, dolor sit amet consectetur adipiae facilis aspernatur,
                ia, rerum sed similique quaerat
            </p>
            
            
            
            <div className='sidebarItem'>
                <span className='sidebarTitle'> Categories</span>
                    <ul className='sidebarList'>
                        {cats.map((c,i)=>(
                            <Link to ={`/?cat=${c.name}`} className="link">
                            <li key={i} className='sidebarListItem'>{c.name}</li>
                            </Link>
                         ))}
                    </ul>

                </div>
                <div className="sidebarItem">
                    <span className='sidebarTitle'>Follow Us</span>
                    <div className=" sidebarSocial">
                        <i className="sidebarIcon fab fa-facebook-square"></i>
                        <i className="sidebarIcon fab fa-twitter-square"></i>
                        <i className="sidebarIcon fab fa-instagram-square"></i>
                        <i className="sidebarIcon fab fa-pinterest"></i>

                    </div>

                </div>
            </div>
        

    )
}
