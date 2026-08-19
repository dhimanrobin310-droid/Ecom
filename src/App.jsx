import './App.css'
import { Header } from './header'
import { Footer } from './footer'
import { Routee } from './routes'
import { Header2 } from './header2'
import { useEffect, useState } from 'react'
import { Context } from './context'

function App(){ const [id, setid] = useState("")
  const [utype, setutype] = useState("")
  const [mail, setmail] = useState("")


  useEffect(() => {
    const info = JSON.parse(localStorage.getItem("data"))
    if (info) {
      const parts = info.split(".")
      if (parts.length === 3) {
        const payload = parts[1]
        const enc = payload.replace(/-/g, '+').replace(/_/g, '/')
        const str = atob(enc)
        const decode = JSON.parse(str)
        setutype(decode.utype)
        setid(decode.id)
        setmail(decode.mail)
        console.log("mail is", mail+"utype" ,utype)
      }
    } },[])
  return (
    <>
      <Header />
      <Context.Provider value={{ id, setid, utype, setutype, mail, setmail }}>
      <Routee />
      </Context.Provider>
      <Footer />
    </>
  )
}

export default App
