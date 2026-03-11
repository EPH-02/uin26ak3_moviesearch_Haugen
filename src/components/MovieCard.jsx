import { Link } from "react-router-dom"

export default function MovieCard({ movie }){
    const slug = movie.Title.toLowerCase().replaceAll(" ", "-") // Lager en slug og gjør om titteler til småbokstaver og erstatter mellomrom med bindestrek (AI)

    return(
        <article>
            <Link to={`/${slug}`}> {/* Gjør movie.Title om til en link som man kan trykke på*/}
                {movie.Poster !== "N/A" ? ( // Sjekker etter plakat om den er tilgjenglig og viser "N/A" om den ikke finnes i API spørrigen (AI)
                    <img src={movie.Poster} alt={movie.Title} /> // Viser plakaten dersom den er tilgjengelig
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
