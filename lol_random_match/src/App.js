import React, { useState } from 'react';
import _ from 'lodash';
import './App.css';

const characters = [
  { id: 1, name: 'Character 1', image: 'image1.jpg' },
  { id: 2, name: 'Character 2', image: 'image2.jpg' },
  // 나머지 98개의 캐릭터 정보
];

function App() {
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);

  const randomizeTeams = () => {
    const shuffledCharacters = _.shuffle(characters);
    setTeam1(shuffledCharacters.slice(0, 15));
    setTeam2(shuffledCharacters.slice(15, 30));
  };

  return (
    <div className="App">
      <div className="team">
        <h2>Team 1</h2>
        {team1.map((character) => (
          <div key={character.id} className="character">
            <img src={character.image} alt={character.name} />
            <span>{character.name}</span>
          </div>
        ))}
      </div>
      <button onClick={randomizeTeams}>Randomize Teams</button>
      <div className="team">
        <h2>Team 2</h2>
        {team2.map((character) => (
          <div key={character.id} className="character">
            <img src={character.image} alt={character.name} />
            <span>{character.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
