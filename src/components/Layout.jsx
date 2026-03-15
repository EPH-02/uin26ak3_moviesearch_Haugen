import { Link } from "react-router-dom"

// Felles layout for alle sider i applikasjonen
// Navigation tilbake til forsiden
// Wrapper-layout brukt av alle sider
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