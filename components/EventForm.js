import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { getGames } from '../utils/data/gameData';
import { createEvent } from '../utils/data/eventData';

const initialState = {
  description: '',
  date: '',
  time: '',
  gameId: 0,
  userId: '',
};

const EventForm = ({ user }) => {
  const [game, setGame] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const router = useRouter();

  useEffect(() => {
    getGames().then(setGame);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();

    const event = {
      description: currentEvent.description,
      date: currentEvent.date,
      time: currentEvent.time,
      game: Number(currentEvent.gameId),
      organizer: user.uid,
    };

    createEvent(event, user.uid).then(() => router.push('/events'));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Event Description</Form.Label>
          <Form.Control name="description" placeholder="Enter Event Name Here" required value={currentEvent.description} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Event Date</Form.Label>
          <Form.Control name="date" placeholder="ex. 11-27-2023" required value={currentEvent.date} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Event Time</Form.Label>
          <Form.Control name="time" placeholder="ex. 12:00" required value={currentEvent.time} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Event Game</Form.Label>
          <Form.Select
            name="gameId"
            required
            value={currentEvent.gameId}
            onChange={handleChange}
          >
            <option value="">Select a game</option>
            {Array.isArray(game)
              && game.map((selectedGame) => (
                <option key={selectedGame.id} value={selectedGame.id}>
                  {selectedGame.title}
                </option>
              ))}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

EventForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventForm;
