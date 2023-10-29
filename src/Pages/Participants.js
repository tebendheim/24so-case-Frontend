// Denne siden er ikke ment til å være offentlig. Med mer tid så måtte denne kun være åpen for en adminbruker.

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ParticipantCard from "../Components/ParticipantCard";

const Participants = () => {
  const { eventid } = useParams();
  const [attendees, setAttendee] = useState([]);
  const [eventname, setEventname] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/participate/${eventid}`)
      .then((res) => {
        setAttendee(res.data);
        if (res.data.length < 1) {
          axios.get(`http://localhost:3000/event/${eventid}`).then((res) => {
            setEventname(res.data[0]);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [eventid]);

  // Use map to render each event
  const eventElements = attendees.map((attendee) => (
    <div key={attendee.id}>
      <ParticipantCard
        name={attendee.name}
        phone={attendee.phone}
        age={attendee.age}
      />
    </div>
  ));

  return (
    <div className="pb-7">
      <section className="flex flex-col justify-center center-items">
        <h2 className="self-center font-bold text-4xl my-7 ">Attendee List</h2>
        {attendees.length === 0 ? (
          <div className="m-auto">
            <div className="font-bold text-4xl mb-7">{eventname.name}</div>
            <p className="text-center">No attendees found</p>
          </div>
        ) : (
          <div className="flex flex-col justify-center center-items">
            <h3 className="m-auto font-bold text-4xl mb-7">
              {attendees[0].event_name}
            </h3>

            <div className="w-1/2 m-auto md:grid-cols-5 md:grid-rows-1 lg:grid-cols-4">
              <div className="flex flex-col space-y-7">{eventElements}</div>
            </div>
          </div>
        )}
        <Link
          className="m-auto w-1/2 bg-blue-500 hover:bg-blue-700 text-white text-center font-bold mt-7 py-2 px-4 rounded"
          to={`/event/${eventid}`}
        >
          Add attendee
        </Link>
      </section>
    </div>
  );
};

export default Participants;
