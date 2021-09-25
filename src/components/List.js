import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

const List = (props) => {
  const [events, setEvents] = useState([0]);

  useEffect(() => {
    axios.get("http://localhost:3001/events").then((response) => {
      setEvents(response.data);
    });
  }, []);

  return (
    <div className="container">
      {/* A JSX comment */}

      {/* <div>
                <p>Valinta 2.</p>
            </div>
            */}
      <Table striped>
        {events.map((content) => (
          <tr key={content.id}>
            <td>
              <p>{content.event}</p>
              <p>{content.place}</p>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
};

export default List;
