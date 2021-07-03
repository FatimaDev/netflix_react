import React,{useEffect,useState} from 'react'
import './Nav.css'

function Nav() {
    const [show, handleShow] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true)
            } else handleShow(false);
        });
        return () => {
            window.removeEventListener("scroll");
        }
    }, []);
    return (
        <div className={`nav ${show && "nav__black"}`}>
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" alt="Netflix Logo" />
          
              <img className="nav__avatar"   src=" https://pbs.twimg.com/profile_images/1398399796667244549/oZeQQEzC_400x400.png  "  alt="Netflix Logo" />          
        </div>
    )
}

export default Nav