import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleEvent } from '../../utils/data/eventData';

function SingleEvent() {
  const [singleEvent, setSingleEvent] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleEvent(id).then((data) => setSingleEvent(data));
  }, [id]);

  return (
    <article className="single-event">
      <h1>Event</h1>
      <p>Description: {singleEvent.description}</p>
      <p>Date: {singleEvent.date}</p>
      <p>Time: {singleEvent.time}</p>
      <p>Game: {singleEvent.game?.title}</p>
      <p>Organizer: {singleEvent.organizer?.bio}</p>
    </article>
  );
}

export default SingleEvent;
