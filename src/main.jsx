import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Header from './Header.jsx'

import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from "react-router-dom"
import OtherLoc from './OtherLoc.jsx'


const route = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Header/>} errorElement={<Error/>}>
    <Route index element={<App/>} />
    <Route path="otherlocation" element={<OtherLoc/>} />
    
  </Route>
))


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={route}/>
  </React.StrictMode>,
)
