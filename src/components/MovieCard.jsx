

export default function MovieCard(){
    return(
        <articel>
            <img src={movie.Poster} alt={movie.Title}></img>
            <h2>{movie.Title}</h2>
            <p>{movie.Year}</p>
        </articel>
    )
}