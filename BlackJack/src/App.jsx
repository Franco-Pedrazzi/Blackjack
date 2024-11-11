import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  //const [id, setId] = useState(null)
  const [deck, setDeck] = useState([{cards:[{image:""}, {image:""}]},{cards:[{image:""}, {image:""}]}])

  useEffect(() => {

    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=2")
      .then(res => res.json())
      .then(data => {

        fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=2`)
          .then(res => res.json())
          .then(data => {
            setDeck([...deck,data])
          })
          console.log(deck)
      })
  }, [])

  return (
    <>
      <img src={deck[0]["cards"][0]["image"]} alt="" />
      <img src={deck[0]["cards"][1]["image"]} alt="" />
      <br />
      <img src={deck[1]["cards"][0]["image"]} alt="" />
      <img src={deck[1]["cards"][1]["image"]} alt="" />
    </>
  )
}

export default App
