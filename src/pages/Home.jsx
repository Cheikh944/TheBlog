import React from 'react'
import './styles/home.css'
import Recent from '../components/Recent/Recent.jsx'
import AllBlogs from '../components/AllBlogs/AllBlogs.jsx'

const Home = () => {

  return (
    <div>
        <h1>THE BLOG</h1>
        <Recent />
        <AllBlogs />
    </div>
  )
}

export default Home