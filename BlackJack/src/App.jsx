import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const backImg = "https://deckofcardsapi.com/static/img/back.png"
  const [deck, setDeck] = useState([]);

  useEffect(() => {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then(res => res.json())
      .then(data => {
        fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=4`)
          .then(res => res.json())
          .then(drawData => {
            setDeck(drawData.cards);
          });
      });
  }, []);

  return (
    <div>
      {deck.length >= 4 ? (
        <>
          <center>
            <img src={backImg} alt="Card 1" />
            <img src={deck[1].image} alt="Card 2" />
            <br />
            <img src={deck[2].image} alt="Card 3" />
            <img src={deck[3].image} alt="Card 4" />
          </center>

        </>
      ) : (
        <p></p>
      )}
    </div>
  );
}

export default App;