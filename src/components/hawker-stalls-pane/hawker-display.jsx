import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StallDetailsModal from './stall-details-modal.jsx';
import BackgroundLayout from '../../icons/background-layout.jsx';
import Toilet from '../../icons/toilet.jsx';
import MakeStallEls from './make-stall-els.jsx';

export default function HawkerDisplay({ categoriesToHighlight, updateCategoriesToHighlight }) {
  const [listOfStalls, setListOfStalls] = useState([]);
  const [showStallDetailsViaModal, setShowStallDetailsViaModal] = useState(false);
  const [stallDetails, setStallDetails] = useState(null);

  const handleClose = () => setShowStallDetailsViaModal(false);
  const handleShow = () => setShowStallDetailsViaModal(true);
  const updateStallDetails = (value) => setStallDetails(value);

  // query the db to get stall info so stalls can be displayed
  useEffect(() => {
    // axios request to db
    axios.get('/getStallDetails')
      .then(({ data }) => {
        console.log(data);
        // update state with new data
        setListOfStalls(data);
      })
      .catch((error) => (console.log(error)));
  }, []);

  // // handle what happens when the user clicks on a stall
  // const displayStallInfoModal = (e, index) => {
  //   // update the state with details of the stall that user selected
  //   // note: have to offset by -1 becos dealing w/ array vs stall num
  //   setStallDetails(listOfStalls[index]);
  //   handleShow();
  // };

  // use .map to make a DOM elements for each stall
  // const MakeDivsForStalls = () => {
  //   console.log('making divs for stalls');
  //   const stallsInBottomRow = listOfStalls.map((eachStall, index) => {
  //     let highlightClass = null;
  //     const position = null;

  //     // When a cuisine is selected, highlight the div of stalls that match that cuisine
  //     if (categoriesToHighlight !== null) {
  //       if ((`${eachStall.categoryId}` in categoriesToHighlight) && (categoriesToHighlight[`${eachStall.categoryId}`] === true)) {
  //         highlightClass = 'highlight';
  //       }
  //     }
  //     // assign className based on unitNum. className will be used to define the position
  //     // if (getStallIndexFromUnitNum(eachStall.unitNum) <= 9) {
  //     //   position = 'bottomRowSection1';
  //     // } else if (getStallIndexFromUnitNum(eachStall.unitNum) >= 10 && (getStallIndexFromUnitNum(eachStall.unitNum) <= 21)) {
  //     //   position = 'bottomRowSection2';
  //     // } else if (getStallIndexFromUnitNum(eachStall.unitNum) >= 22 && (getStallIndexFromUnitNum(eachStall.unitNum) <= 25)) {
  //     //   position = 'middleRowSection1';
  //     // } else if (getStallIndexFromUnitNum(eachStall.unitNum) >= 26 && (getStallIndexFromUnitNum(eachStall.unitNum) <= 33)) {
  //     //   position = 'middleRowSection2';
  //     // } else if (getStallIndexFromUnitNum(eachStall.unitNum) >= 34 && (getStallIndexFromUnitNum(eachStall.unitNum) <= 46)) {
  //     //   position = 'topRow';
  //     // }
  //     return (
  //       <button
  //         type="button"
  //         className={`${highlightClass} ${position} stalls`}
  //         key={eachStall.id}
  //         onClick={(e) => {
  //           // use item's index to identify which stall the  user has selected
  //           displayStallInfoModal(e, index);
  //         }}
  //       >
  //         <SvgForStallsRedRoof unitNum={eachStall.unitNum} />
  //       </button>
  //     );
  //   });
  //   const stallsInTopRow = listOfStalls.map((eachStall, index) => {
  //     let highlightClass = '';

  //     // When a cuisine is selected, highlight the div of stalls that match that cuisine
  //     if (categoriesToHighlight !== null) {
  //       if ((`${eachStall.categoryId}` in categoriesToHighlight) && (categoriesToHighlight[`${eachStall.categoryId}`] === true)) {
  //         highlightClass = 'highlight';
  //       }
  //     }
  //     return (
  //       <button
  //         type="button"
  //         className={`${highlightClass} stalls`}
  //         key={eachStall.id}
  //         onClick={(e) => {
  //         // use item's index to identify which stall the  user has selected
  //           displayStallInfoModal(e, index);
  //         }}
  //       >
  //         <TopRowStallIcon />
  //       </button>
  //     );
  //   });
  //   return (
  //     <div>
  //       <div className="topRowStallsContainer">
  //         {stallsInTopRow}
  //       </div>

  //       <div className="sideRowStallsContainer" />

  //       <div className="bottomRowStallsContainer">
  //         {stallsInBottomRow}
  //       </div>
  //     </div>
  //   );
  // };
  return (

    <div className="hawkerDisplay-container">

      <div className="toilet-container">
        <Toilet className="toilet" />
      </div>

      <MakeStallEls
        listOfStalls={listOfStalls}
        categoriesToHighlight={categoriesToHighlight}
        updateStallDetails={updateStallDetails}
        handleShow={handleShow}
      />

      <BackgroundLayout className="background-layout" />
      {/* <Layout /> */}
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

  );
}
