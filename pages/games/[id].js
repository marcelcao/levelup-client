import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleGame } from '../../utils/data/gameData';

function SingleGame() {
  const [singleGame, setSingleGame] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleGame(id).then((data) => setSingleGame(data));
  }, []);

  return (
    <article className="single-game">
      <h1>Game</h1>
      <p>Title: {singleGame.title}</p>
      <p>By: {singleGame.maker}</p>
      <p>Number of Players: {singleGame.number_of_players}</p>
      <p>Skill Level: {singleGame.skill_level}</p>
    </article>
  );
}

export default SingleGame;
