import { useEffect, useState } from "react"
import MovieCard from "../components/MovieCard"

// Forside som håndterer søk og visning av filmer fra OMDb API
export default function Home(){
    const [search, setSearch] = useState("") // State for søkefeltet
    const [searchResults, setSearchResult] = useState([]) // State for søkeresultater hentet fra API
    const [errorMessage, setErrorMessage] = useState("") 
    const trimmedSearch = search.trim() // Fjerner whitespace slik at tomme søk ikke trigges
    const canSearch = trimmedSearch.length >= 3 // Sjekker om brukeren har skrevet nok til å trigge søk
    const apiKey = import.meta.env.VITE_OMBD_API_KEY 

    // Henter filmer fra OMDb basert på tittel
    // Hvis API returnerer feil, vis melding og stopp videre rendering
    // Fjerner duplikater basert på imdbID før visning
    const fetchMovies = async(query)=>{ 
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

    // Henter en standardliste første gang siden lastes
    useEffect(() => {
        fetchMovies("james bond")
    }, [])

    const getMovies = async()=>{
        if (!canSearch) return

        fetchMovies(trimmedSearch)
    }
    // Hindrer default form-submit og håndterer søk manuelt
    // Filtrerer og fjerner duplikater basert på imdbID før visning
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
