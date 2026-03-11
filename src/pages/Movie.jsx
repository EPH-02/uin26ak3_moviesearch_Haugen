import { useParams } from "react-router-dom"

export default function Movie(){
    const {movie} = useParams() // Henter ut movie fra URL'en
    const movieTitle = movie?.replaceAll("-", " ") // Gjør om slug tilbake til tittelen (AI)

    return(
        <main>
            <h1>{movieTitle}</h1>
        </main>
    )
}
