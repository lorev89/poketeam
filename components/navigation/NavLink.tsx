type NavLinkProps = {
    to:string
    children:any
}

export default function NavLink({to, children} : NavLinkProps) {
    return <a href={to} className={`mx-4`}>
        {children}
    </a>
}
