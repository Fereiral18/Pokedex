import { useEffect, useState } from "react"
import { PokemonContext } from "./PokemonContext"
import { useForm } from "../hooks/useForm"


export const PokemonProvider = ({children}) => {


    const [globalPokemon, setglobalPokemon] = useState([])
    const [allPokemon, setallPokemon] = useState([])
    const [offset, setOffset] = useState(0)

    const {valueSearch, onInputChange, onResetForm} = useForm({
        valueSearch : '',
    })

    const [loading, setloading] = useState(true)
    const [active, setactive] = useState(false)

  
    const getAllPokemons = async(limit = 60) =>{
        const baseURL = `https://pokeapi.co/api/v2/`

        const res = await fetch(`${baseURL}pokemon?limit=${limit}&offset=${offset}`)
        const data = await res.json()
       
        const promises = data.results.map(async(pokemon) =>{
            const res =  await fetch(pokemon.url)
            const data = await res.json()
            return data
        })
        const result = await Promise.all(promises)
        
        setallPokemon([
            ...allPokemon,
            ...result,
        ])
        setloading(false)
    }

    const getGlobalPokemons = async() => {
        const baseURL = `https://pokeapi.co/api/v2/`

        const res = await fetch(`${baseURL}pokemon?limit=100000&offset=${offset}`)
        const data = await res.json()
       
        const promises = data.results.map(async(pokemon) =>{
            const res =  await fetch(pokemon.url)
            const data = await res.json()
            return data
        })
        const result = await Promise.all(promises)
        
        setglobalPokemon(result)
        setloading(false)
    }

    const getPokemonById = async(id) =>{
        const baseURL = `https://pokeapi.co/api/v2/`

        const res = await fetch(`${baseURL}pokemon/${id}`)
        const data = await res.json()
        return data
    }

    useEffect(() => {
     getAllPokemons()
    }, [])

    useEffect(() => {
     getGlobalPokemons()
    }, [])

    return (
    <>
        <PokemonContext.Provider 
        value={{
            valueSearch,
            onInputChange,
            onResetForm,
            allPokemon,
            globalPokemon,
            getPokemonById,
        }}>
            {children}
        </PokemonContext.Provider>
    </>
  )
}
