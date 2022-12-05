import Head from 'next/head'
import HomeComponent from "../components/HomeComponent"
import Nav from "../components/Nav"
import Footer from "../components/Footer"

export default function Home() {
  return (
    <>
      <Nav />
      <HomeComponent />
      <Footer />
    </>
  )
}
