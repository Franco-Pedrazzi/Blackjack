import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {

  const [backImg,setBackImg]=useState("https://deckofcardsapi.com/static/img/back.png")
  const [deckId, setDeckId] = useState(null);
  const [house, setHouse] = useState([]);
  const [player, setPlayer] = useState([]);
  const [lose, setLose] = useState(false)

  const determineValue = (arr) => {
    let totalValue = 0;
    let aceCount = 0;

    arr.map((card) => {
      if (card.value == "JACK" || card.value == "QUEEN" || card.value == "KING") { totalValue += 10 }
      else if (card.value == "ACE") { aceCount += 1 }
      else { totalValue += parseInt(card.value) }
    });

    for (let i = 0; i < aceCount; i++) {
      if (totalValue + 11 > 21) { totalValue += 1 }
      else { totalValue += 11 }
    }
    if (totalValue > 21) {
      setLose(true)
    }
    return totalValue;
  }
  const addCard = () => {
    if (deckId) {
      fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(res => res.json())
        .then(data => {
          if (data.cards.length > 0) {
            setPlayer(prevPlayer => [...prevPlayer, data.cards[0]]);
          }
        });
    }
  };
const HousePlays=()=>{
  setBackImg(house[0].image)
  while(lose!=true && determineValue(house)<=17){
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
        .then(res => res.json())
        .then(data => {
          if (data.cards.length > 0) {
            setHouse(prevHouse => [...prevHouse, data.cards[0]]);
          }
        });
    }
  }

  useEffect(() => {
    setHouse([]);
    setPlayer([]);
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then(res => res.json())
      .then(data => {
        setDeckId(data.deck_id);
        console.log(deckId)

        fetch(`https://deckofcardsapi.com/api/deck/${data.deck_id}/draw/?count=4`)
          .then(res => res.json())
          .then(drawData => {
            setHouse(drawData.cards.slice(0, 2));
            setPlayer(drawData.cards.slice(2, 4));
          });
      });
  }, [lose]);

  return (
    <div>
      {house.length >= 2 && player.length >= 2 ? (
        lose == true ? (
          <div>
            <button onclick={()=>console.log(false)}>replay</button>
          </div>
        ) : (

          <div>
            <center>
              <img src={backImg} alt="Card 1" />
              <img src={house[1].image} alt="" />
              <br />

              {player.map((playerCard, index) => (
                <img key={index} src={playerCard.image} />
              ))}
              <p>{determineValue(player)}</p>
              <br />

              <button onClick={addCard}>Add Card</button>
              <button onClick={HousePlays}>Stop</button>
            </center>
          </div>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
