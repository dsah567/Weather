import React from 'react'
import { Link, Outlet,NavLink } from 'react-router-dom'

import LinkedinLogo from './assets/linkedin.svg'
import GithubLogo from './assets/github.svg'

export default function Header() {
  return (
  <>
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="flex-grow lg:flex lg:justify-center space-x-4 lg:space-x-8">

        <NavLink 
            to="/" 
            className={({ isActive }) =>`${ isActive ?  "text-blue-400" : "text-white"}  hover:font-bold `}
          >
             CurrentLoaction
        </NavLink>

        <NavLink 
            to="otherlocation"
            className={({ isActive }) =>`${ isActive ?  "text-blue-400" : "text-white"}  hover:font-bold `}
          >
             OtherLoaction
        </NavLink>    


      </div>

      <div className="flex space-x-4 lg:space-x-8 ml-auto">

        <Link to="https://www.linkedin.com/in/sahd7929/" target="_blank">
          <img src={LinkedinLogo} alt='Linkedin Logo'  width={30}/>
          </Link>

        <Link to="https://github.com/dsah567/Weather" target="_blank">
          <img src={GithubLogo} alt='Github Logo' width={30} className='bg-slate-50 p-0.5'/>
        </Link>

      </div>
      </nav>
    </header>

    <Outlet/>
  </>
  )
}