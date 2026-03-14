import { Link } from "react-router-dom"

export default function MovieCard({ movie }){
    const slug = movie.Title.toLowerCase().replaceAll(" ", "-")

    return(
        <article className="movieCard">  
                <Link to={`/${slug}`} state={{ imdbID: movie.imdbID }}>{/* Bruker imdbID i URL slik at detaljsiden kan hente riktig film */}
                    <img 
                    src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.png"} 
                    alt={movie.Title} 
                    onError={(e) => {e.currentTarget.src = "/no-poster.png"}}/> 
                <h2>{movie.Title}</h2>
                <p>{movie.Year}</p>
            </Link>
        </article>
    )
}
