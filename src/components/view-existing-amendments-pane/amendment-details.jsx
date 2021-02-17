import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default function AmendmentDetails({
  show, handleClose, handleShow, selectedAmendment, handleChangeToInput, updateSelectedAmendment,
}) {
  // fn that will make an irreversible modification of the original stall's info
  const handleAmendmentSubmission = () => {
    // db query to create a new entry
    axios.post('/submitUpdatedStall', { selectedAmendment })
      .then(() => {
        console.log('carrying out axios/updateAmendment');
        axios.post('/updateAmendment', { selectedAmendment });
      })
      .then(() => {
        console.log('updating SelectedAmendment to null.......');
        updateSelectedAmendment(null);
      })
      .catch((error) => console.log(error));

    handleClose();
  };

  return (

    <Modal className="my-modal" show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Approve amendment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="row">
            <div className="col-4">
              Unit no.
            </div>
            <div className="col-8">
              {/* <input
                type="text"
                placeHolder="select a stall to begin"
                value={selectedAmendment === null ? '' : selectedAmendment.unitNum}
                onChange={(e) => {
                  // second argument must be identical to the db key for this to work
                  handleChangeToInput(e, 'unitNum');
                }}
              /> */}
              {selectedAmendment === null ? '' : selectedAmendment.unitNum}
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
                value={selectedAmendment === null ? '' : selectedAmendment.name}
                onChange={(e) => {
                  // second argument must be identical to the db key for this to work
                  handleChangeToInput(e, 'name');
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
                value={selectedAmendment === null ? '' : selectedAmendment.categoryId}
                onChange={(e) => {
                  // second argument must be identical to the db key for this to work
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
                value={selectedAmendment === null ? '' : selectedAmendment.operatingHours}
                onChange={(e) => {
                  // second argument must be identical to the db key for this to work
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
                value={selectedAmendment === null ? '' : selectedAmendment.menu}
                onChange={(e) => {
                  // second argument must be identical to the db key for this to work
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
        <Button
          variant="primary"
          onClick={handleAmendmentSubmission}
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>

  );
}
