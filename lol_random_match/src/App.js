// import React, { useState } from 'react';
// import _ from 'lodash';
// import './App.css';

// const characters = [
//   { id: 1, name: 'Character 1', image: 'image1.jpg' },
//   { id: 2, name: 'Character 2', image: 'image2.jpg' },
//   // 나머지 98개의 캐릭터 정보
// ];

// function App() {
//   const [team1, setTeam1] = useState([]);
//   const [team2, setTeam2] = useState([]);

//   const randomizeTeams = () => {
//     const shuffledCharacters = _.shuffle(characters);
//     setTeam1(shuffledCharacters.slice(0, 15));
//     setTeam2(shuffledCharacters.slice(15, 30));
//   };

//   return (
//     <div className="App">
//       <div className="team">
//         <h2>Team 1</h2>
//         {team1.map((character) => (
//           <div key={character.id} className="character">
//             <img src={character.image} alt={character.name} />
//             <span>{character.name}</span>
//           </div>
//         ))}
//       </div>
//       <button onClick={randomizeTeams}>Randomize Teams</button>
//       <div className="team">
//         <h2>Team 2</h2>
//         {team2.map((character) => (
//           <div key={character.id} className="character">
//             <img src={character.image} alt={character.name} />
//             <span>{character.name}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from 'react';

function ChampionList() {
  const [championData, setChampionData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://ddragon.leagueoflegends.com/cdn/14.3.1/data/ko_KR/champion.json'
        );
        const data = await response.json();
        // JSON 데이터에서 "name"과 "image"의 "full" 값을 추출하여 리스트로 저장
        const championList = Object.entries(data.data).map(([key, value]) => ({
          name: value.name,
          image: value.image.full,
        }));
        setChampionData(championList);
      } catch (error) {
        console.error('Error fetching champion data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Champion List</h1>
      <ul>
        {championData.map((champion, index) => (
          <li key={index}>
            <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${champion.image}`} alt={champion.name} />
            {champion.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChampionList;
