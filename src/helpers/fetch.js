import React from 'react'

export const firstFetch = async (url) => {
  const response = await fetch(url)
  const movies = await response.json()
  return movies
}