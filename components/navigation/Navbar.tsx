import {useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import NavLink from './NavLink'
import MobileNav from './MobileNav'
import logo from '../../assets/images/logo.png'

export default function Navbar() {
    const [open, setOpen] = useState(false)
    return (
        <nav className="relative nflex filter drop-shadow-md bg-white px-20 md:px-40 py-6 h-20 items-center justify-center z-[1] ">
            <MobileNav open={open} setOpen={setOpen}/>
            <div className="absolute w-4/12 flex items-center">
                <Link className="text-2xl font-semibold" href="/">
                    <Image src={logo} alt='logo' height={70} width={100}/>
                </Link>
            </div>
            <div className="w-11/12 flex justify-end items-center">
                <div className="z-[3] flex relative w-8 h-8 flex-col justify-between items-center md:hidden" onClick={() => {
                    setOpen(!open)
                }}>
                    <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-3.5" : ""}`} />
                    <span className={`h-1 w-full bg-black rounded-lg transition-all duration-300 ease-in-out ${open ? "w-0" : "w-full"}`} />
                    <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "-rotate-45 -translate-y-3.5" : ""}`} />
                </div>
                <div className="hidden md:flex md:w-1/12">
                    <NavLink to="/team/list">
                        List
                    </NavLink>
                    <NavLink to="/team/create">
                        Create
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}