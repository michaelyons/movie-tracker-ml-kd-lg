import React from 'react'
import { cleanMovies } from './cleaner';

export const firstFetch = async (url) => {
  const response = await fetch(url)
  const movies = await response.json()
  return await cleanMovies(movies)
}