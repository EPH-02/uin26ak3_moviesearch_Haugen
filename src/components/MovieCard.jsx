import { Link } from "react-router-dom"

export default function MovieCard({ movie }){
    // Lager slug fra tittel for bruk i URL
    const slug = movie.Title.toLowerCase().replaceAll(" ", "-")

    return(
        <article className="movieCard">  
                <Link to={`/${slug}`} state={{ imdbID: movie.imdbID }}>{/* Sender imdbID via state slik at detaljsiden kan hente riktig data */}
                    <img 
                    // Fallback hvis poster mangler eller feiler å laste på 
                    src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.png"} 
                    alt={"Mangler plakat for " + movie.Title}/> 
                <h2>{movie.Title}</h2>
                <p>{movie.Year}</p>
            </Link>
        </article>
    )
}
