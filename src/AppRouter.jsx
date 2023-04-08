import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { Navigation } from './components/Navigation'
import { HomePages, PokemonPages, SearchPages } from './pages';

export const AppRouter = () => {
  return (
   <Routes>
      <Route path='/' 
      element={<Navigation/>}>
        <Route index element={<HomePages/>} />
        <Route path='pokemon/:id' element={<PokemonPages/>}/>
        <Route path='Search' element={<SearchPages/>}/>
      </Route>
      <Route path='*' element={<Navigate to='/' />}/>
   </Routes>
  )
};
