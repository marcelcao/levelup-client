import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { getGames } from '../utils/data/gameData';
import { createEvent, updateEvent } from '../utils/data/eventData';
import { useAuth } from '../utils/context/authContext';

const initialState = {
  description: '',
  date: '',
  time: '',
  gameId: 0,
  userId: '',
};

const EventForm = ({ eventObj }) => {
  const [game, setGame] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getGames().then(setGame);

    if (eventObj.id) {
      setCurrentEvent({
        id: eventObj.id,
        description: eventObj.description,
        date: eventObj.date,
        time: eventObj.time,
        game: eventObj.game?.id,
        organizer: user.uid,
      });
    }
  }, [eventObj, user]);

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

    if (eventObj.id) {
      const update = {
        id: eventObj.id,
        description: currentEvent.description,
        date: currentEvent.date,
        time: currentEvent.time,
        game: Number(currentEvent.gameId),
        organizer: user.uid,
      };
      updateEvent(update, user.uid).then(() => router.push(`/events/${eventObj.id}`));
    } else {
      const event = {
        description: currentEvent.description,
        date: currentEvent.date,
        time: currentEvent.time,
        game: Number(currentEvent.gameId),
        organizer: user.uid,
      };
      createEvent(event, user.uid).then(() => router.push('/events'));
    }
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
          <Form.Control name="date" placeholder="ex. 2023-11-17" required value={currentEvent.date} onChange={handleChange} />
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
        <Button variant="primary" type="submit"> {eventObj.id ? 'Update' : 'Create'} Event </Button>
      </Form>
    </>
  );
};

EventForm.propTypes = {
  eventObj: PropTypes.shape({
    id: PropTypes.number,
    description: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    game: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    }),
  }),
};

EventForm.defaultProps = {
  eventObj: initialState,
};

export default EventForm;
