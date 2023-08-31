import { Outlet, Link, useNavigate, useLocation, useOutletContext } from "react-router-dom"

import { useState } from "react";



function Header() {

    const [user, setUser] = useState({})
    const [checkout, setCheckout] = useState([])
    const navigate = useNavigate();
    const location = useLocation()

    const [isNavOpen, setIsNavOpen] = useState(false)

    const goBack = () => {
        if (location.pathname !== "/") {
            navigate(-1);
        }
    };

    return (
        <div className="w-full">
            <div className="border-b-green-900 border-b-2">
                <nav className="flex items-center justify-between mx-5 ">

                    <div className=" md:hidden " onClick={goBack}>
                        {location.pathname !== "" && (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-6 h-6 text-green-800" >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 19.5L8.25 12l7.5-7.5"
                                />
                            </svg>


                        )}
                    </div>

                    <div className="w-40 pb-2 ">
                        <Link to="/">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Logo_Petrole%C3%B3s_Mexicanos_%282018-2024%29.svg/2560px-Logo_Petrole%C3%B3s_Mexicanos_%282018-2024%29.svg.png"></img>
                        </Link>
                    </div>



                    <div
                        className="HAMBURGER-ICON space-y-2 hover:bg-gray-500 py-2 px-2 rounded-lg md:hidden  "
                        onClick={() => setIsNavOpen((prev) => !prev)} 
                    >   
                        <span className="barraHamburger block bg-gray-600 rounded-md"></span>
                        <span className="barraHamburger block bg-gray-600 rounded-md"></span>
                        <span className="barraHamburger block bg-gray-600 rounded-md"></span>
                    </div>

                    <div className={isNavOpen ? "showMenuNav" : "hideMenuNav "}> 
                        <div
                            className="CROSS-ICON absolute top-0 right-0 px-8 py-8 "
                            onClick={() => setIsNavOpen(false)} 
                        >
                            <svg
                                className="h-8 w-8 text-white"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </div>
                        <ul className="flex flex-col items-center gap-2  text-center text-white">
                            <li className="w-full my-2 mx-4 uppercase border-b-4 border-green-600 font-bold">
                                <a href="/signUp">Registrarse</a>
                            </li>
                            <li className="w-full my-2 mx-4 uppercase border-b-4 border-green-600 font-bold">
                                <a href="/">Ver Actividades</a>
                            </li>
                        </ul>
                    </div>

                    <div className=" md:flex-row gap-2  sm:items-center hidden md:block">
                        <Link to="/signUp"
                            className="px-1 md:p-2 hover:bg-gray-600 rounded-md transition-colors hover:text-white font-bold "
                        >Registrarse</Link>
                        <Link to="/"
                            className="px-1 md:p-2 hover:bg-gray-600 rounded-md transition-colors hover:text-white font-bold "
                        >Ver actividades</Link>

                    </div> 



                </nav>
            </div>

            <div className="w-full h-full ">
                <Outlet context={{ user, setUser, checkout, setCheckout }} />
            </div>
        </div>
    )
}



export default Header