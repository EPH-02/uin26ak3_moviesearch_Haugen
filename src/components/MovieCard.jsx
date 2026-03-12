import { Link } from "react-router-dom"

export default function MovieCard({ movie }){
    const posterURL = movie.Poster && movie.Poster !== "N/A" ? movie.Poster : null

    return(
        <article className="movieCard">  
            <Link to={`/${movie.imdbID}`} state={{ movie }}> {/* Bruker imdbID i URL slik at detaljsiden kan hente riktig film */}
                {posterUrl ? ( // Sjekker etter plakat om den er tilgjenglig og viser "N/A" om den ikke finnes i API spørrigen (AI)
                    <img src={posterUrl} alt={movie.Title} /> // Viser plakaten dersom den er tilgjengelig
                ) : (
                    <p>Ingen plakat tilgjengelig</p> // En ekstra sjekk dersom "N/A" ikke er gydlig
                )}
                <h2>{movie.Title}</h2>
                <p>{movie.Year}</p>
                <p>{movie.Type}</p>
            </Link>
        </article>
    )
}
