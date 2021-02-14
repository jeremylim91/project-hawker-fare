import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time
import StallDetailsModal from './stall-details-modal.jsx';
import BackgroundLayout from '../../icons/background-layout.jsx';
// import { ReactComponent as BackgroundLayout } from '../../icons/background-layout-test2.svg';
import { ReactComponent as Toilet } from '../../icons/Toilets.svg';
import MakeStallEls from './make-stall-els.jsx';
// import { ReactComponent as BackgroundLayout } from '../../icons/Layout_Sgm_3_test1.svg';

export default function HawkerDisplay({ categoriesToHighlight, updateCategoriesToHighlight }) {
  // const [listOfStalls, setListOfStalls] = useState([]);
  const [showStallDetailsViaModal, setShowStallDetailsViaModal] = useState(false);
  const [stallDetails, setStallDetails] = useState(null);
  const [dragState, setDragState] = useState(
    {
      activeDrags: 0,
      deltaPosition: { x: 0, y: 0 },
      controlledPosition: { x: -400, y: 200 },
    },
  );

  const handleClose = () => setShowStallDetailsViaModal(false);
  const handleShow = () => setShowStallDetailsViaModal(true);
  const updateStallDetails = (value) => setStallDetails(value);

  const handleDrag = (e, ui) => {
    const { x, y } = dragState.deltaPosition;
    const newDragState = { ...dragState };
    newDragState.deltaPosition = {
      x: x + ui.deltaX,
      y: y + ui.deltaY,
    };
    setDragState(newDragState);
  };

  const onStart = () => {
    const newDragState = { ...dragState };
    newDragState.activeDrags += dragState.activeDrags;

    setDragState(newDragState);
  };

  const onStop = () => {
    const newDragState = { ...dragState };
    newDragState.activeDrags -= dragState.activeDrags;

    setDragState(newDragState);
  };

  // For controlled component
  const adjustXPos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newDragState = { ...dragState };

    const { x, y } = dragState.controlledPosition;
    newDragState.controlledPosition = {
      x: x - 10,
      y,
    };
    setDragState(newDragState);
  };
  const adjustYPos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newDragState = { ...dragState };

    const { x, y } = dragState.controlledPosition;
    newDragState.controlledPosition = {
      x,
      y: y - 10,
    };
    setDragState(newDragState);
  };

  const onControlledDrag = (e, position) => {
    const { x, y } = position;
    const newDragState = { ...dragState };
    newDragState.controlledPosition = { x, y };

    setDragState(newDragState);
  };
  const onControlledDragStop = (e, position) => {
    dragState.onControlledDrag(e, position);
    dragState.onStop();
  };

  const dragHandlers = { onStart, onStop };

  const { deltaPosition, controlledPosition } = dragState;

  console.log('running hawkerDisplay');

  return (
  // <div className="fixed-container-for-hawker-display">
  /* <div
      className="box"
      style={{
        height: '500px', width: '500px', position: 'relative', overflow: 'hidden', backgroundColor: 'black', padding: '0',
      }}
    > */

  /* <div style={{ height: '1000px', width: '1000px', padding: '10px' }}> */

    <Draggable {... dragHandlers}>

      <div className="hawkerDisplay-container" bounds="parent">

        <div className="toilet-container">
          <Toilet />
        </div>

        <div className="wet-market">
          Wet market
        </div>

        <MakeStallEls
          categoriesToHighlight={categoriesToHighlight}
          updateStallDetails={updateStallDetails}
          handleShow={handleShow}
        />
        {/* <div className="background-layout"> */}
        <BackgroundLayout />
        {/* </div> */}

        {showStallDetailsViaModal === true ? (
          <StallDetailsModal
            handleClose={handleClose}
            handleShow={handleShow}
            show={showStallDetailsViaModal}
            stallDetails={stallDetails}
            updateCategoriesToHighlight={updateCategoriesToHighlight}
          />
        ) : ''}
      </div>
    </Draggable>

  );
}
