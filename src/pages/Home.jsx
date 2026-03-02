import { useEffect, useState } from "react"
import History from "../components/History"


export default function Home(){
    const [search, setSearch] = useState()
    const storedHistory = localStorage.getItem("search")
    const [history, setHistory] = useState(storedHistory ? JSON.parse(storedHistory) : [])
    const [focused, setFocused] = useState(false)

    console.log("denne kommer fra storage", storedHistory)

    const baseUrl = `http://www.omdbapi.com/?s=${search}&apikey=`
    // BRA PRATICE: Legg API key i .env fil og hent den derfra, slik at den ikke ligger i koden
    const apiKey = import.meta.env.VITE_APP_API_KEY

    useEffect(()=> {
        localStorage.setItem("search", JSON.stringify(history))
    }),[history]

    const getMovies = async()=>{
        try{
            const response = await fetch(`${baseUrl}${apiKey}`)
            const data = await response.json()
            console.log(data)
        }
        catch(err){
            console.error(err);
        }
    }
    
    const handleChange = (e)=>{
        setSearch(e.target.value)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        e.target.reset()
       
        setHistory((prev) => [...prev, search])
        
        
         //getMovies()
    }
    
    console.log(history)

    return(
        <main>
            <h1>Forside</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Søk etter film
                    <input type="search" placeholder="Indiana Jones" onChange={handleChange} onFocus={()=> setFocused(true)} onBlur={()=> setFocused(false)}></input>
                </label>   
            {focused ? <History history={history} setSearch={setSearch} /> : null}
                <button onClick={getMovies}>Søk</button>
            </form>
        </main>
    )
}