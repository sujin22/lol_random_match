import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import championJsonData from './champion_v14.3.1_20240215171009.json';

function ChampionList() {
  const [championData, setChampionData] = useState([]);
  const [randomChampions1, setRandomChampions1] = useState([]);
  const [randomChampions2, setRandomChampions2] = useState([]);
  const [randomCnt, setRandomCnt] = useState(0);

  const selectRandomChampions = useCallback(() => {
    if (championData.length === 0) return;

    const shuffledChampions = [...championData].sort(() => 0.5 - Math.random()); 
    const selectedChampions1 = shuffledChampions.slice(0, 15);
    const selectedChampions2 = shuffledChampions.slice(15, 30);

    setRandomChampions1(selectedChampions1);
    setRandomChampions2(selectedChampions2);
    setRandomCnt(prevCnt => prevCnt + 1); // 이전 상태를 기반으로 상태를 업데이트합니다.
  }, [championData]); // 의존성 배열에 championData를 추가합니다.

  useEffect(() => {
    const mappingData = () => {
      const champions = Object.values(championJsonData.data);
      const championList = champions.map(champion => ({
        name: champion.name,
        image: champion.image.full
      }));
      setChampionData(championList);
    };
    mappingData();
  }, []);


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
      <button className="btn_random" onClick={() => selectRandomChampions(championData)}>랜덤 실행</button>
      <p className="random_cnt">뽑기 횟수: {randomCnt}</p>
      <div className="champion_list_area">
        <div className='list_container'>


          <ul id="champion_list1">
            {randomChampions1.map((champion, index) => (
              <li key={index} className="character">
                <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${champion.image}`} alt={champion.name} />
                {champion.name}
              </li>
            ))}
          </ul>
          {randomChampions2.length > 0 && <button className="btn_copy1" onClick={() => copyChampionList(1)}>복사</button>}
        </div>
        <div className='list_container'>
          <ul id="champion_list2">
            {randomChampions2.map((champion, index) => (
              <li key={index} className="character">
                <img src={`https://ddragon.leagueoflegends.com/cdn/14.3.1/img/champion/${champion.image}`} alt={champion.name} />
                {champion.name}
              </li>
            ))}
          </ul>
          {randomChampions2.length > 0 && <button className="btn_copy2" onClick={() => copyChampionList(2)}>복사</button>}

        </div>
      </div>
    </div>
  );
}

export default ChampionList;
