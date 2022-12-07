import Head from 'next/head'
import HomeComponent from "../components/HomeComponent"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import React from "react"
import { DiffieHellmanGroup } from 'crypto'

export default function Home() {
  const [dayAvailability, changeDayAvailability] = React.useState(new Date().getDate())
  

  return (
    <>
      { (dayAvailability == 12 || dayAvailability == 13 || dayAvailability == 14) ?
      <>
        <Nav />
        <HomeComponent />
        <Footer />
      </>
      :
      <main className="unavailableMain">
          <img src="https://media.istockphoto.com/id/531047383/vector/santa-claus-in-snow.jpg?b=1&s=612x612&w=0&k=20&c=lSU_nm8iYU_oKLaQJzof6V3Jor_lCjgHwcohQiP4pYw=" alt="SANTA CLAUSE IS SO DARN EPIC LETS GO GAMERS LET GO" />
          <h1>Santa is Currently Unavailable</h1>
          <p>Please report back Decembre 12th, 13th and 14th!</p>
      </main>
      }   
    </>
  )
}
