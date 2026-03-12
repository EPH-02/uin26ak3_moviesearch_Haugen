import { useEffect, useState } from "react"
import { useParams, useLocation } from "react-router-dom"

export default function Movie(){
    const { movieId } = useParams() // movieId er imbdID
    const location = useLocation()
    const [movie, setMovie] = useState(location.state?.movie || null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const apiKey = import.meta.env.VITE_APP_API_KEY

    useEffect(() => {
        if (movie) return
            async function fetchMovie() {
                    setLoading(true)
                    try {
                        const apikey = import.meta.env.VITE_OMDB_API_KEY
                        const res = await fetch(`https://www.omdbapi.com/?apikey=${apikey}&i=${movieId}&plot=full`)
                        const data = await res.json()
                        if (data.Response === 'True') setMovie(data)
                        else setError(data.Error || 'Fant ikke filmen')
                    } catch (err) {
                        setError('Nettverksfeil')
                    } finally {
                        setLoading(false)
            }
        }
        fetchMovie()
    }, [movieId])

    return(
        <article>
            <h1>{movie?.Title ?? "Movie"}</h1>
            {movie.Poster && movie.Poster !== 'N/A' ? (
        <img src={movie.Poster} alt={`Plakat for ${movie.Title}`} />
            ) : (
                <p>Ingen plakat</p>
            )}
            <p>{movie?.Year ?? "Year unavailable"}</p>
            <p>{movie?.Type ?? "Type unavailable"}</p>
        </article>
    )
}
