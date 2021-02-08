import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import AmendmentDetails from './amendment-details.jsx';

export default function ListOfAmendments({ allAmendmentsFromDb, selectedAmendment, updateSelectedAmendment }) {
  // thise useState determines whether the modal will show
  const [show, setShow] = useState(false);
  // this useState enables the autocomplete feature in the modal
  // const [selectedAmendment, setSelectedAmendment] = useState(null);

  console.log('selectedAmendment is:');
  console.log(selectedAmendment);

  // Fn to update e input fields of the modal, as well as e state that manages e 'autocomplete'
  const handleChangeToInput = (e, fieldName) => { // fieldName corresponds to e key of selectedStall
    const newSelectedAmendment = { ...selectedAmendment };
    newSelectedAmendment[`${fieldName}`] = e.target.value;
    updateSelectedAmendment(newSelectedAmendment);
  };

  // fns to enable lifting: opening and closing the modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // fn to surroudn each ammendment with html tags to put them into a bootstrap grid
  const rowsOfAmendments = allAmendmentsFromDb.map((element, index) => (
    <>
      <div className="row">
        <div className="col">
          {element.name}
        </div>
        <div className="col">
          {element.unitNum}
        </div>
        <div className="col">
          {element.userId}
        </div>
        <div className="col">
          <Button onClick={() => {
            updateSelectedAmendment(allAmendmentsFromDb[index]);
            setShow(true);
          }}
          >
            Review
          </Button>
        </div>
      </div>
    </>
  ));
  return (
    <>
      {rowsOfAmendments}
      {show === true && (
      <AmendmentDetails
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        selectedAmendment={selectedAmendment}
        handleChangeToInput={handleChangeToInput}
        updateSelectedAmendment={updateSelectedAmendment}
      />
      )}
    </>
  );
}
