import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "../Components/Card";

const Home = () => {
  const { eventid } = useParams();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/event`)
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [eventid]);

  // Use map to render each event
  const eventElements = events.map((event) => (
    <div key={event.id}>
      <Card id={event.id} name={event.name} />
    </div>
  ));

  return (
    <div>
      {events.length === 0 ? (
        <div>No events found</div>
      ) : (
        <section className="flex flex-col  justify-center center-items">
          <h2 className=" py-7 m-auto font-bold text-4xl">Event List</h2>
          <div className="w-1/2 m-auto md:grid-cols-5 md:grid-rows-1 lg:grid-cols-4 pb-7">
            <div className="flex flex-col space-y-7">{eventElements}</div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
