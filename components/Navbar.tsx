import Link from 'next/link'
import Image from 'next/image'
import {useState} from 'react'
import logo from '../assets/images/logo.png'

interface NavLinkProps {
    to:string
    children:any
}

interface MobileNavProps {
    open:boolean
    setOpen:any
}

function NavLink({to, children} : NavLinkProps) {
    return <a href={to} className={`mx-4`}>
        {children}
    </a>
}

function MobileNav({open, setOpen} : MobileNavProps) {
    return (
        <div className={`absolute top-0 left-0 h-screen w-screen bg-white transform ${open ? "-translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out filter drop-shadow-md `}>
            <div className="flex items-center justify-center filter drop-shadow-md bg-white h-20"> {/*logo container*/}
                <Link className="text-xl font-semibold" href="/">
                    <Image src={logo} alt='logo' height={70} width={100}/>
                </Link>
            </div>
            <div className="flex flex-col ml-4">
                <Link className="text-xl font-medium my-4" href="/team/list" onClick={() => setTimeout(() => {setOpen(!open)}, 100)}>
                    List
                </Link>
                <Link className="text-xl font-normal my-4" href="/team/create" onClick={() => setTimeout(() => {setOpen(!open)}, 100)}>
                    Create
                </Link>
            </div>
        </div>
    )
}

export default function Navbar() {

    const [open, setOpen] = useState(false)
    return (
        <nav className="flex filter drop-shadow-md bg-white px-16 py-4 h-20 items-center">
            <MobileNav open={open} setOpen={setOpen}/>
            <div className="w-3/12 flex items-center">
                <Link className="text-2xl font-semibold" href="/"><Image src={logo} alt='logo' height={70} width={100}/></Link>
            </div>
            <div className="w-9/12 flex justify-end items-center">

                <div className="z-50 flex relative w-8 h-8 flex-col justify-between items-center md:hidden" onClick={() => {
                    setOpen(!open)
                }}>
                    <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "rotate-45 translate-y-3.5" : ""}`} />
                    <span className={`h-1 w-full bg-black rounded-lg transition-all duration-300 ease-in-out ${open ? "w-0" : "w-full"}`} />
                    <span className={`h-1 w-full bg-black rounded-lg transform transition duration-300 ease-in-out ${open ? "-rotate-45 -translate-y-3.5" : ""}`} />
                </div>

                <div className="hidden md:flex">
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