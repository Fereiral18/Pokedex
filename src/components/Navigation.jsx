import React, { useContext } from 'react'
import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'
import { PokemonContext } from '../context/PokemonContext'

export const Navigation = () => {

  const {numero} = useContext(PokemonContext)
  console.log(numero)
  
    return (
    <>
    <header>
        <Link to='/'>
            <img 
                src='https://iconos8.es/icon/63311/pokeball'
                alt='Logo Pokedex'
            />
        </Link>
        {/* onSubmit={onSearchSubmit} */}
        <form >
            <div>
                <input type="search" 
                name='valueSearch'
                id=''
                // value={valueSearch}
                // onChange={onInputChange}
                placeholder='Buscar nombre de pokemon'

                />
            </div>
            <button>Buscar</button>
        </form>
    </header>
    <Outlet/>
    </>
  )
}
