import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import GameCard from '../../components/GameCard';
import { getGames } from '../../utils/data/gameData';

function Home() {
  const [games, setGames] = useState([]);
  const router = useRouter();

  const getAllGames = () => {
    getGames().then((data) => setGames(data));
  };

  useEffect(() => {
    getAllGames();
  }, []);

  return (
    <article className="games">
      <Button
        onClick={() => {
          router.push('/games/new');
        }}
      >
        Register New Game
      </Button>
      <h1>Games</h1>
      {games.map((game) => (
        <section key={`game--${game.id}`} className="game">
          <GameCard gameObj={game} onUpdate={getAllGames} />
        </section>
      ))}
    </article>
  );
}

export default Home;
