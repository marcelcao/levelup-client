import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { deleteEvent, joinEvent, leaveEvent } from '../utils/data/eventData';
import { useAuth } from '../utils/context/authContext';

export default function EventCard({ eventObj, onUpdate }) {
  const router = useRouter();
  const { user } = useAuth();

  const deleteThisEvent = () => {
    if (window.confirm('Delete this game?')) {
      deleteEvent(eventObj.id).then(() => onUpdate());
    }
  };

  const join = () => {
    joinEvent(eventObj.id, user.uid).then(() => onUpdate());
  };

  const leave = () => {
    leaveEvent(eventObj.id, user.uid).then(() => onUpdate());
  };

  return (
    <>
      <Card className="text-center">
        <Card.Header>{eventObj.description}</Card.Header>
        <Card.Body>
          <Card.Title>By: {eventObj.organizer.bio}</Card.Title>
          <Card.Title>When: {eventObj.date} at {eventObj.time}</Card.Title>
          <Card.Text>Game: {eventObj.game.title}</Card.Text>
        </Card.Body>
        <Button
          onClick={() => {
            router.push(`/events/edit/${eventObj.id}`);
          }}
        >Edit
        </Button>
        <Button
          onClick={deleteThisEvent}
        >Delete
        </Button>
        {eventObj.joined ? (
          <Button
            onClick={leave}
          >Leave
          </Button>
        )
          : (
            <Button
              onClick={join}
            >Join
            </Button>
          )}
      </Card>
    </>
  );
}

EventCard.propTypes = {
  eventObj: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    game: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
    }),
    organizer: PropTypes.shape({
      bio: PropTypes.string.isRequired,
    }),
    joined: PropTypes.bool.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
