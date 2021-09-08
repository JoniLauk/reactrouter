import React, {useState, useEffect, props} from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import * as ReactDOM from 'react-dom'

import 'bootstrap/dist/css/bootstrap.min.css';

const Add = (props) => {

    const [events, setEvents] = useState([props.events])
    const [newEvent, setNewEvent] = useState('') 
    const [newEventPlace, setNewEventPlace] = useState('')
    const [validated, setValidated] = useState(false);

    const addEvent = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          } else {
            setValidated(true);
            event.preventDefault();
            const eventObject = {
                event: newEvent,
                place: newEventPlace,
            }
      
            setEvents(events.concat(eventObject))
            console.log(eventObject.event)
            setNewEvent('')
            setNewEventPlace('')
      
            axios
              .post('http://localhost:3001/events', eventObject)
              .then(response => {
                console.log(response)})
                alert('Event is submitted. See list tab!')
          }
          
          setValidated(true);
    }

    const handleEventChange = (event) => {
        console.log(event.target.value)
        setNewEvent(event.target.value)
    }

    const handleEventPlaceChange = (event) => {
        console.log(event.target.value)
        setNewEventPlace(event.target.value)
    }

    return(
        <div className="events">
            <Form id='myForm' noValidate validated={validated} onSubmit={addEvent}>
                <Form.Group className="mb-3" controlId="formBasicEvent">
                    <Form.Label>Event</Form.Label>
                    <Form.Control required onChange={handleEventChange} value={newEvent} type="text" placeholder="Name of the event" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEventPlace">
                    <Form.Label>Event place</Form.Label>
                    <Form.Control required onChange={handleEventPlaceChange} value={newEventPlace} type="text" placeholder="Place of the event" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default Add