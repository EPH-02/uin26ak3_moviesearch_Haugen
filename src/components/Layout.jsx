import { Link } from "react-router-dom"

export default function Layout({children}){
    return(
        <>
        <header>
            <nav>
                <Link to="/">Hjem</Link>
                <Link to="Movie">Filmer</Link>
            </nav>
        </header>
        
        {children}
        </>
    )
}