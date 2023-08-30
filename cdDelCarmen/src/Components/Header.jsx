import { Outlet, Link, useNavigate, useLocation, useOutletContext } from "react-router-dom"

import { useState } from "react";



function Header() {

    const [user, setUser] = useState({})
    const [checkout, setCheckout] = useState([])
    const navigate = useNavigate();
    const location = useLocation()

    const goBack = () => {
        if (location.pathname !== "/") {
            navigate(-1);
        }
    };

    return (
        <div className="w-full">
            <div className="border-b-green-900 border-b-2">
                <nav className="flex items-center justify-between mx-5 ">

                    <div className=" md:hidden" onClick={goBack}>
                        {location.pathname !== "/" && (
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

                    <div className="flex flex-col md:flex-row gap-2  sm:items-center">

                        
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