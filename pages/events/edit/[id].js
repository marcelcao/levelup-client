import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleEvent } from '../../../utils/data/eventData';
import EventForm from '../../../components/EventForm';

export default function EditEvent() {
  const [editEvent, setEditEvent] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    getSingleEvent(id).then(setEditEvent);
  }, [id]);

  return (
    <>
      <EventForm eventObj={editEvent} />
    </>
  );
}
