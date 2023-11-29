import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Card, Button } from 'react-bootstrap';

export default function EventCard({ eventObj }) {
  const router = useRouter();

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
  }).isRequired,
};
