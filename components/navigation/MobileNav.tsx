import Link from "next/link"
import Image from "next/image"
import logo from '../../assets/images/logo.png'

type MobileNavProps = {
    open:boolean
    setOpen:any
}

export default function MobileNav({open, setOpen} : MobileNavProps) {
    return (
        <div className={`absolute z-[2] top-0 left-0 h-auto w-screen bg-white transform ${open ? "-translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out filter drop-shadow-md `}>
            <div className="bg-amber-200">
                <div className="flex  items-center justify-center filter drop-shadow-md bg-white h-20"> {/*logo container*/}
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
        </div>
    )
}
