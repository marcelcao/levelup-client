import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import EventCard from '../../components/EventCard';
import { getEvents } from '../../utils/data/eventData';

function Home() {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  const getAllEvents = () => {
    getEvents().then((data) => setEvents(data));
  };

  useEffect(() => {
    getAllEvents();
  }, []);

  return (
    <article className="events">
      <Button
        onClick={() => {
          router.push('/events/new');
        }}
      >Create New Event
      </Button>
      <h1>List of Events</h1>
      {events.map((event) => (
        <section key={`event--${event.id}`} className="event">
          <EventCard eventObj={event} onUpdate={getAllEvents} />
        </section>
      ))}
    </article>
  );
}

export default Home;
