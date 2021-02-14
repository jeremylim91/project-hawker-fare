import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import DropDownComponent from './drop-down-components.jsx';

export default function SuggestAmendments({ updateMode }) {
  const [show, setShow] = useState(false);
  const [stallsForDropdown, setStallsForDropdown] = useState(null);
  const [selectedStall, setSelectedStall] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const updateSelectedStall = (value) => setSelectedStall(value);
  const handleChangeToInput = (e, fieldName) => { // fieldName corresponds to e key of selectedStall
    const newSelectedStall = { ...selectedStall };
    newSelectedStall[`${fieldName}`] = e.target.value;
    setSelectedStall(newSelectedStall);
  };

  const handleReqToSuggestedAmendment = () => {
    // query the db to get stall info so stalls can be displayed
    // axios request to db
    updateMode('hawkerDisplay');

    axios.get('/getStallDetails')
      .then(({ data }) => {
        setStallsForDropdown(data);
        handleShow();
      })
      .catch((error) => (console.log(error)));
  };

  const handleAmendmentSubmission = () => {
    // db query to create a new entry
    axios.post('/submitNewAmendment', { selectedStall })
      .then(() => {})
      .catch((error) => console.log(error));

    handleClose();
  };

  return (
    <>
      <Button
        variant="primary"
        onClick={handleReqToSuggestedAmendment}
        className="navBarButtons removeButtonStyle"
      >
        Suggest amendment
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Suggest an amendment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <div className="row">
              <div className="col-4">
                Stall
              </div>
              <div className="col-8">
                <DropDownComponent stallsForDropdown={stallsForDropdown} updateSelectedStall={updateSelectedStall} />
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                Name
              </div>
              <div className="col-8">
                <input
                  type="text"
                  placeHolder="select a stall to begin"
                  value={selectedStall === null ? '' : selectedStall.name}
                  onChange={(e) => {
                    handleChangeToInput(e, 'name');
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                Unit no.
              </div>
              <div className="col-8">
                <input
                  type="text"
                  placeHolder="select a stall to begin"
                  value={selectedStall === null ? '' : selectedStall.unitNum}
                  onChange={(e) => {
                    handleChangeToInput(e, 'unitNum');
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                Category
              </div>
              <div className="col-8">
                <input
                  type="text"
                  placeHolder="select a stall to begin"
                  value={selectedStall === null ? '' : selectedStall.categoryId}
                  onChange={(e) => {
                    handleChangeToInput(e, 'categoryId');
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                Operating hours
              </div>
              <div className="col-8">
                <input
                  type="text"
                  placeHolder="select a stall to begin"
                  value={selectedStall === null ? '' : selectedStall.operatingHours}
                  onChange={(e) => {
                    handleChangeToInput(e, 'operatingHours');
                  }}
                />
                {' '}

              </div>
            </div>
            <div className="row">
              <div className="col-4">
                Menu
              </div>
              <div className="col-8">
                <input
                  type="text"
                  placeHolder="select a stall to begin"
                  value={selectedStall === null ? '' : selectedStall.menu}
                  onChange={(e) => {
                    handleChangeToInput(e, 'menu');
                  }}
                />
              </div>
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAmendmentSubmission}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
