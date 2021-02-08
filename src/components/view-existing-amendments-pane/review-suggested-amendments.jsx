import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListOfAmendments from './list-of-amendments.jsx';

export default function ReviewSuggestedAmendments({ mode }) {
  // useState that contains every instance of an amendment
  const [allAmendmentsFromDb, setAllAmendmentsFromDb] = useState([]);
  const [selectedAmendment, setSelectedAmendment] = useState(null);

  // fm t setSElectedAmendment (to be passed down for lifting)
  const updateSelectedAmendment = (value) => { setSelectedAmendment(value); };

  // query the db to get all the amendments
  useEffect(() => {
  // axios req to db
    axios.get('/getListOfAmendments')
      .then(({ data }) => {
        // update state w/ the data
        setAllAmendmentsFromDb(data);
      // change the mode to conditionally render the view
      })
      .catch((error) => console.log(error));
  }, [mode, selectedAmendment]);

  if (allAmendmentsFromDb.length === 0) {
    return (
      <div className="no-amendments-to-display">
        {' '}
        <h2>No amendments to display</h2>
      </div>
    );
  }
  return (
    <div className="container review-suggested-amendments-container">
      <div className="row">
        <div className="col">
          Stall Name
        </div>
        <div className="col">
          Stall number
        </div>
        <div className="col">
          Submitted by
        </div>
      </div>
      <ListOfAmendments
        allAmendmentsFromDb={allAmendmentsFromDb}
        selectedAmendment={selectedAmendment}
        updateSelectedAmendment={updateSelectedAmendment}
      />
    </div>
  );
}
