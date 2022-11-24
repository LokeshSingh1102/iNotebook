import React from 'react'
import AddNote from './AddNote'
import Note from './Note'

const Home = () => {

  return (
    <div className="container">
      <AddNote/>      
      <Note />
    </div>

  )
}

export default Home
