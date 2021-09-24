import React, { useState, useEffect, props } from "react";
import axios from "axios";

const Add = (props) => {
  const [events, setEvents] = useState([props.events]);
  const [newEvent, setNewEvent] = useState("a new event...");
  const [newEventPlace, setNewEventPlace] = useState("a new event place...");

  const addEvent = (event) => {
    event.preventDefault();
    const eventObject = {
      event: newEvent,
      place: newEventPlace,
    };

    setEvents(events.concat(eventObject));
    console.log(eventObject.event);
    setNewEvent("");
    setNewEventPlace("");

    axios.post("http://localhost:3001/events", eventObject).then((response) => {
      console.log(response);
    });
  };

  const handleEventChange = (event) => {
    console.log(event.target.value);
    setNewEvent(event.target.value);
  };

  const handleEventPlaceChange = (event) => {
    console.log(event.target.value);
    setNewEventPlace(event.target.value);
  };

  return (
    <div className="events">
      <form onSubmit={addEvent}>
        <input value={newEvent} onChange={handleEventChange} /> <br></br>
        <input value={newEventPlace} onChange={handleEventPlaceChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default Add;
