import { useEffect, useState } from "react"
import MovieCard from "../components/MovieCard"


export default function Home(){
    const [search, setSearch] = useState("")
    const [searchResults, setSearchResult] = useState([])
    const [errorMessage, setErrorMessage] = useState("")
    const trimmedSearch = search.trim()
    // Hindrer API-kall før brukeren faktisk har skrevet et meningsfullt søk.
    const canSearch = trimmedSearch.length >= 3
    const apiKey = import.meta.env.VITE_OMBD_API_KEY

    const fetchMovies = async(query)=>{ // Funksjon for å hente filmer fra API 
        try{
            setErrorMessage("")
            // encodeURIComponent gjør at søk med mellomrom og spesialtegn blir gyldige i URL-en.
            const response = await fetch(`https://www.omdbapi.com/?s=${encodeURIComponent(query)}&type=movie&apikey=${apiKey}`)
            const data = await response.json()

            if (data.Response === "False") {
                setSearchResult([])
                setErrorMessage(data.Error ?? "Fant ingen filmer.")
                return
            }

            // Filtrerer bort spill og dedupliserer på imdbID før rendering.
            const uniqueMovies = Array.from(
                new Map(
                    (data.Search ?? [])
                        .filter((movie) => movie.Type === "movie").map((movie) => [movie.imdbID, movie])).values()
            )

            setSearchResult(uniqueMovies)
        }
        catch(err){
            setSearchResult([])
            setErrorMessage("Noe gikk galt under søket.")
            console.error(err);
        }
    }

    // Laster en startliste slik at forsiden ikke er tom første gang appen åpnes.
    useEffect(() => {
        fetchMovies("james bond")
    }, [])

    const getMovies = async()=>{
        if (!canSearch) return

        fetchMovies(trimmedSearch)
    }
    
    const handleChange = (e)=>{
        setSearch(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        if (!canSearch) return

        getMovies() 
        // Tømmer inputfeltet etter et vellykket søk, men beholder resultatlisten.
        setSearch("")
    }

    return(
        <main>
            <h1>Forside</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Søk etter film
                    <input
                        type="search"
                        placeholder="James Bond"
                        value={search}
                        onChange={handleChange}
                    />
                </label>   
                <button type="submit" disabled={!canSearch}>Søk</button>
            </form>
            {errorMessage ? <p>{errorMessage}</p> : null}
            <section>
                {searchResults.map((movie) => (
                    <MovieCard key={movie.imdbID} movie={movie} />
                ))}
            </section>
        </main>
    )
}
