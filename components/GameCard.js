import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { deleteGame } from '../utils/data/gameData';

export default function GameCard({ gameObj, onUpdate }) {
  const router = useRouter();

  const deleteThisGame = () => {
    if (window.confirm('Delete this game?')) {
      deleteGame(gameObj.id).then(() => onUpdate());
    }
  };

  return (
    <>
      <Card className="text-center">
        <Card.Header>{gameObj.title}</Card.Header>
        <Card.Body>
          <Card.Title>By: {gameObj.maker}</Card.Title>
          <Card.Text>{gameObj.number_of_players} players needed</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">Skill Level: {gameObj.skill_level}</Card.Footer>
        <Button
          onClick={() => {
            router.push(`/games/edit/${gameObj.id}`);
          }}
        >Edit
        </Button>
        <Button
          onClick={deleteThisGame}
        >Delete
        </Button>
      </Card>;
    </>
  );
}

GameCard.propTypes = {
  gameObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    maker: PropTypes.string.isRequired,
    number_of_players: PropTypes.number.isRequired,
    skill_level: PropTypes.number.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
