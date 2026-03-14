import { Link } from "react-router-dom"

export default function Layout({children}){
    return(
        <>
        <header>
            <nav>
                <Link to="/">Hjem</Link>
            </nav>
        </header>
        
            {children}

        </>
    )
}