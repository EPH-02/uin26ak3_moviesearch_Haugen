import { useEffect, useState } from "react"
import { useParams, useLocation } from "react-router-dom"


export default function Movie(){
    const { movieId } = useParams() // movieId er imdbID
    const location = useLocation()

    const imdbID = location.state?.imdbID || movieId // Fallback til URL-parametere dersom state ikke er tilgjengelig, for bedre støtte ved direkte URL-tilgang.

    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const apiKey = import.meta.env.VITE_OMBD_API_KEY

    useEffect(() => {
        if (!imdbID) return
        
               const fetchMovie = async () => {
                    try {
                        setLoading(true)
                        const res = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=full`)
                        const data = await res.json()
                        if (data.Response === 'True') {setMovie(data)}
                        else {setError('Fant ikke filmen')}
                    } catch {
                        setError('Noe gikk galt')
                    } finally {
                    setLoading(false)
                    }   
                }
        fetchMovie()
    }, [imdbID])

        if (loading) return <p>Laster...</p>
        if (error) return <p>{error}</p>
        if (!movie) return null

    return(
            <article>
                <h1>{movie?.Title ?? "Movie"}</h1>
            <img 
                src={movie?.Poster !== "N/A" ? movie.Poster : "/no-poster.png"} 
                alt={`Plakat for ${movie.Title}`}
                onError={(e) => {e.currentTarget.src = "/no-poster.png"}} />
         
                <section>
                    <p><strong>År:</strong> {movie?.Year}</p>
                    <p><strong>Sjanger:</strong> {movie?.Genre}</p>
                    <p><strong>Regissør:</strong> {movie?.Director}</p>
                    <p><strong>Skuespillere:</strong> {movie?.Actors}</p>
                    <p><strong>Plot:</strong> {movie?.Plot}</p>
                </section>
            </article>
    )
}
