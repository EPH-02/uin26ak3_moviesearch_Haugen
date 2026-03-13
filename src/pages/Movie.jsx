import { useEffect, useState } from "react"
import { useParams, useLocation } from "react-router-dom"


export default function Movie(){
    const { movieId } = useParams() // movieId er imbdID
    const location = useLocation()
    const imbdId = location.state?.imbdId
    const [movie, setMovie] = useState(location.state?.movie || null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const apiKey = import.meta.env.VITE_OMBD_API_KEY



    useEffect(() => {
        if (!imbdId) return
            async function fetchMovie() {
                    setLoading(true)
                    try {
                        const res = await fetch(`https://www.omdbapi.com/?apikey=${apikey}&i=${movieId}&plot=full`)
                        const data = await res.json()
                        if (data.Response === 'True') {setMovie(data)}
                        else {setError('Fant ikke filmen')}
                    } catch (err) {
                        setError('Noe gikk galt')
                    } finally {
                    setLoading(false)
            }
        }
        fetchMovie()
    }, [imbdId])

    return(
            <article>
                <h1>{movie?.Title ?? "Movie"}</h1>
                {movie?.Poster && movie.Poster !== "N/A" ? (
            <img src={movie?.Poster} alt={`Plakat for ${movie.Title}`} />
                ) : (
                    <p>Ingen plakat</p>
                )}
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
