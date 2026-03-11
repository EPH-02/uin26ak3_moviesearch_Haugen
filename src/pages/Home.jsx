import { useEffect, useState } from "react"
import MovieCard from "../components/MovieCard"


export default function Home(){
    const [search, setSearch] = useState()
    // const storedHistory = localStorage.getItem("search")
    // const [history, setHistory] = useState(storedHistory ? JSON.parse(storedHistory) : [])
    const [searchResults, setSearchResult] = useState([])
    const trimmedSearch = search?.trim() ?? "" // Sjekker om search er null eller undefined, legger til tom streng dersom det stemmer
    const canSearch = trimmedSearch.length >= 3 // Sjekker at søket er minst 3 tegn, for å unngå unødvendig API kall

    // console.log("denne kommer fra storage", storedHistory)

    // BRA PRATICE: Legg API key i .env fil og hent den derfra, slik at den ikke ligger i koden
    const apiKey = import.meta.env.VITE_APP_API_KEY

    // useEffect(()=> {
    //     localStorage.setItem("search", JSON.stringify(history))
    // }, [history])

    const fetchMovies = async(query)=>{
        try{
            const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`)
            const data = await response.json()
            setSearchResult(data.Search ?? []) // Sjekker om data.Search er null eller undefined, legger til tom array dersom det stemmer, for å unngå feil når vi prøver å mappe over searchResults
            console.log(data)
        }
        catch(err){
            console.error(err);
        }
    }

    useEffect(() => {
        fetchMovies("james bond")
    }, [])

    const getMovies = async()=>{
        if (!canSearch) return // Sjekker at søket er gyldig før vi det kjøres et API kall. Funksjonen vil avlsutte dersom søket ikker er gyldig

        fetchMovies(trimmedSearch)
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
                    <input type="search" placeholder="Batman" onChange={handleChange}></input>
                </label>   
                <button type="submit" disabled={!canSearch}>Søk</button> {/* Knappen være deaktivert dersom søket ikke er gyldig, for å unngå unødvendige API kall */}
            </form>
            <section>
                {searchResults.map((movie) => ( // Mapper over searchResults og rendrer en MovieCard for hver film i resultatene
                    <MovieCard key={movie.imdbID} movie={movie} /> //Bruker imdbID som key, da den er unik for hver film
                ))}
            </section>
        </main>
    )
}
