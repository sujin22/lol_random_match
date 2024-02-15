import React, { useState, useEffect } from 'react';
import './App.css'; // CSS 파일을 import
import championJsonData from './champion_v14.3.1_20240215171009.json'; // JSON 파일을 import


function ChampionList() {
  const [championData, setChampionData] = useState([]);
  const [randomChampions1, setRandomChampions1] = useState([]);
  const [randomChampions2, setRandomChampions2] = useState([]);

  useEffect(() => {
    // JSON 데이터에서 "name"과 "image"의 "full" 값을 추출하여 리스트로 저장
    const mappingData = () => {
      const champions = Object.values(championJsonData.data);
      const championList = champions.map(champion => ({
        name: champion.name,
        image: champion.image.full
      }));
      console.log(championList);
      setChampionData(championList);
      selectRandomChampions(championList); // championData가 설정된 후 랜덤 챔피언을 선택
    }
    mappingData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         'https://ddragon.leagueoflegends.com/cdn/14.3.1/data/ko_KR/champion.json'
  //       );
  //       const data = await response.json();
  //       // JSON 데이터에서 "name"과 "image"의 "full" 값을 추출하여 리스트로 저장
  //       const championList = Object.entries(data.data).map(([key, value]) => ({
  //         name: value.name,
  //         image: value.image.full,
  //       }));
  //       setChampionData(championList);
  //       selectRandomChampions(championList); // championData가 설정된 후 랜덤 챔피언을 선택
  //     } catch (error) {
  //       console.error('Error fetching champion data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const selectRandomChampions = (championList) => {
    if (championList.length === 0) return; // championList가 아직 비어있다면 랜덤 챔피언을 선택하지 않음

    const shuffledChampions = championList.sort(() => 0.5 - Math.random());
    const selectedChampions1 = shuffledChampions.slice(0, 15);
    const selectedChampions2 = shuffledChampions.slice(16, 31);

    setRandomChampions1(selectedChampions1);
    setRandomChampions2(selectedChampions2);
  };

  const copyChampionList = (listNumber) => {
    const selectedList = listNumber === 1 ? randomChampions1 : randomChampions2;
    const listText = selectedList.map(champion => champion.name).join(', ');

    navigator.clipboard.writeText(listText)
      .then(() => console.log(`챔피언 목록이 복사되었습니다: ${listText}`))
      .catch(() => console.log('챔피언 목록 복사에 실패했습니다.'));
  };

  return (
    <div className="App">
      <h1>칼바람유치원 팀짜기</h1>
      <button onClick={() => selectRandomChampions(championData)}>랜덤 챔피언 뽑기</button>
      <div className="champion_list_area"> 
        <ul className="champion_list1"> 
          {randomChampions1.map((champion, index) => (
            <li key={index} className="character">
              <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${champion.image}`} alt={champion.name} />
              {champion.name}
            </li>
          ))}
          <button onClick={() => copyChampionList(1)}>복사</button>
        </ul>
        <ul className="champion_list2"> 
          {randomChampions2.map((champion, index) => (
            <li key={index} className="character">
              <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${champion.image}`} alt={champion.name} />
              {champion.name}
            </li>
          ))}
          <button onClick={() => copyChampionList(2)}>복사</button>
        </ul>
      </div>
    </div>
  );
}

export default ChampionList;
