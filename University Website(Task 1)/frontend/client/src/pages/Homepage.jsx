import React from 'react'
import Message from './sub-comonents/Message'
import MainPage from './sub-comonents/MainPage'
import Footer from './sub-comonents/Footer'

const Homepage = () => {
  
  return (
    <>
    <div className="md:flex justify-between">
        <MainPage/>
        <Message/>
    </div>
    <div className="md:hidden flex">
    <Footer/>
      </div>
    </>
  )
}

export default Homepage