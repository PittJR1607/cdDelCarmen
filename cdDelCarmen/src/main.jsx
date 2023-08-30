import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/App.css'

import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Header from './Components/Header';
import Home from './Pages/Home'
import SignUp from './Pages/SignUp'
import Privacy from './Pages/Privacy'
import Reports from './Pages/Reports'

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <Header/>,
            children: [
                {
                    index: true,
                    element: <Home/>,
                },
                {
                    path:'/signUp',
                    element: <SignUp/>
                },
  
                {
                    path: '/privacy',
                    element: <Privacy/>
                },
                {
                    path: '/reports',
                    element: <Reports/>
                }
            ]
        }
    ]
)

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
       <RouterProvider router={router} />
    </React.StrictMode>

)
