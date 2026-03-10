import { useState } from "react"
import History from "../components/History"


export default function Home(){
    const [search, setSearch] = useState()
    // const storedHistory = localStorage.getItem("search")
    // const [history, setHistory] = useState(storedHistory ? JSON.parse(storedHistory) : [])
    const [history, setHistory] = useState([])
    const [focused, setFocused] = useState(false)
    const trimmedSearch = search?.trim() ?? "" // Sjekker om search er null eller undefined, legger til tom streng dersom det stemmer
    const canSearch = trimmedSearch.length >= 3 // Sjekker at søket er minst 3 tegn, for å unngå unødvendig API kall

    // console.log("denne kommer fra storage", storedHistory)

    const baseUrl = `http://www.omdbapi.com/?s=${trimmedSearch}&apikey=` 
    // BRA PRATICE: Legg API key i .env fil og hent den derfra, slik at den ikke ligger i koden
    const apiKey = import.meta.env.VITE_APP_API_KEY

    // useEffect(()=> {
    //     localStorage.setItem("search", JSON.stringify(history))
    // }, [history])

    const getMovies = async()=>{
        if (!canSearch) return // Sjekker at søket er gyldig før vi det kjøres et API kall. Funksjonen vil avlsutte dersom søket ikker er gyldig

        try{
            const response = await fetch(`${baseUrl}${apiKey}`)
            const data = await response.json()
            console.log(data)
        }
        catch(err){
            console.error(err);
        }
    }
    
    const handleChange = (e)=>{
        setSearch(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        if (!canSearch) return // Sjekker om søket er gyldig om søket er 3 tegn eller mer, dersom ikke vil funksjonen avslutte og API kall vil ikke bli utført

        e.target.reset()
       
        //setHistory((prev) => [...prev, trimmedSearch]) 
        getMovies()
    }
    
    //console.log(history)

    return(
        <main>
            <h1>Forside</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Søk etter film
                    <input type="search" placeholder="Batman" onChange={handleChange} onFocus={()=> setFocused(true)} onBlur={()=> setFocused(false)}></input>
                </label>   
            {/* {focused ? <History history={history} setSearch={setSearch} /> : null} */}
                <button type="submit" disabled={!canSearch}>Søk</button> 
            </form>
        </main>
    )
}
