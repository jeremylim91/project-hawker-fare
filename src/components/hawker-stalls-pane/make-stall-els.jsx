import React from 'react';
import SvgForStallsRedRoof from '../../icons/Svg-for-stalls-red-roof-2feb.jsx';
import BottomRowStallIcon from '../../icons/Svg-for-stalls-bottom-row.jsx';
import TopRowStallIcon from '../../icons/Svg-for-stalls-top-row.jsx';
import getStallIndexFromUnitNum from '../../helperFns/get-stall-index.mjs';
import MiddleRowStallIcon from '../../icons/Svg-for-stalls-middle-row.jsx';

export default function MakeStallEls({
  listOfStalls, categoriesToHighlight, updateStallDetails, handleShow,
}) {
  console.log('making stall elements');

  // handle what happens when the user clicks on a stall
  const displayStallInfoModal = (e, index) => {
    // update the state with details of the stall that user selected
    // note: have to offset by -1 becos dealing w/ array vs stall num
    updateStallDetails(listOfStalls[index]);
    handleShow();
  };

  // use .map to create stalls as buttons; then, store them in their respective divs

  const stallsInBottomRow = listOfStalls.map((eachStall, index) => {
    let highlightClass = null;
    const position = null;

    // When a cuisine is selected, highlight the div of stalls that match that cuisine
    if (categoriesToHighlight !== null) {
      if ((`${eachStall.categoryId}` in categoriesToHighlight) && (categoriesToHighlight[`${eachStall.categoryId}`] === true)) {
        highlightClass = 'highlight';
      }
    }

    // assign className based on unitNum. className will be used to define the position
    // if (getStallIndexFromUnitNum(eachStall.unitNum) <= 9) {
    //   position = 'bottomRowSection1';
    // } else if (getStallIndexFromUnitNum(eachStall.unitNum) >= 10 && (getStallIndexFromUnitNum(eachStall.unitNum) <= 21)) {
    //   position = 'bottomRowSection2';
    // } else if (getStallIndexFromUnitNum(eachStall.unitNum) >= 22 && (getStallIndexFromUnitNum(eachStall.unitNum) <= 25)) {
    //   position = 'middleRowSection1';
    // } else if (getStallIndexFromUnitNum(eachStall.unitNum) >= 26 && (getStallIndexFromUnitNum(eachStall.unitNum) <= 33)) {
    //   position = 'middleRowSection2';
    // } else if (getStallIndexFromUnitNum(eachStall.unitNum) >= 34 && (getStallIndexFromUnitNum(eachStall.unitNum) <= 46)) {
    //   position = 'topRow';
    // }
    return (
      <button
        type="button"
        className={`${highlightClass} ${position} stalls`}
        key={eachStall.id}
        onClick={(e) => {
          // use item's index to identify which stall the  user has selected
          displayStallInfoModal(e, index);
        }}
      >
        <SvgForStallsRedRoof unitNum={eachStall.unitNum} />
      </button>
    );
  });

  // const bottomRowSection1Stalls = [];
  // const bottomRowSection2Stalls = [];
  // const middleRowSection1Stalls = [];
  // const middleRowSection2Stalls = [];
  // const topRowSection1Stalls = [];

  // listOfStalls.forEach((element) => {
  //   if (element.unitNum <= 9) bottomRowSection1Stalls.push(element);
  //   else if (element.unitNum >= 10 && element.unitNum <= 21) bottomRowSection2Stalls.push(element);
  //   else if (element.unitNum >= 22 && element.unitNum <= 25) middleRowSection1Stalls.push(element);
  //   else if (element.unitNum >= 26 && element.unitNum <= 33) middleRowSection2Stalls.push(element);
  //   else if (element.unitNum >= 34 && element.unitNum <= 46) topRowSection1Stalls.push(element);
  // });

  const stallsInTopRow = listOfStalls.map((eachStall, index) => {
    let highlightClass = '';
    console.log('eachStall is:');
    console.log(eachStall);
    if (getStallIndexFromUnitNum(eachStall.unitNum) >= 34) {
    // When a cuisine is selected, highlight the div of stalls that match that cuisine
      if (categoriesToHighlight !== null) {
        if ((`${eachStall.categoryId}` in categoriesToHighlight) && (categoriesToHighlight[`${eachStall.categoryId}`] === true)) {
          highlightClass = 'highlight';
        }
      }
      return (
        <button
          type="button"
          className={`${highlightClass} stalls`}
          key={eachStall.id}
          onClick={(e) => {
          // use item's index to identify which stall the  user has selected
            displayStallInfoModal(e, index);
          }}
        >
          <TopRowStallIcon />
        </button>
      );
    }
  });
  const bottomRowSect1Stalls = listOfStalls.map((eachStall, index) => {
    let highlightClass = '';
    console.log('eachStall is:');
    console.log(eachStall);
    if (getStallIndexFromUnitNum(eachStall.unitNum) <= 9) {
    // When a cuisine is selected, highlight the div of stalls that match that cuisine
      if (categoriesToHighlight !== null) {
        if ((`${eachStall.categoryId}` in categoriesToHighlight) && (categoriesToHighlight[`${eachStall.categoryId}`] === true)) {
          highlightClass = 'highlight';
        }
      }
      return (
        <button
          type="button"
          className={`${highlightClass} stalls`}
          key={eachStall.id}
          onClick={(e) => {
          // use item's index to identify which stall the  user has selected
            displayStallInfoModal(e, index);
          }}
        >
          <BottomRowStallIcon />
        </button>
      );
    }
  });
  const bottomRowSect2Stalls = listOfStalls.map((eachStall, index) => {
    let highlightClass = '';
    console.log('eachStall is:');
    console.log(eachStall);
    if ((getStallIndexFromUnitNum(eachStall.unitNum) >= 10) && (getStallIndexFromUnitNum(eachStall.unitNum) <= 21)) {
    // When a cuisine is selected, highlight the div of stalls that match that cuisine
      if (categoriesToHighlight !== null) {
        if ((`${eachStall.categoryId}` in categoriesToHighlight) && (categoriesToHighlight[`${eachStall.categoryId}`] === true)) {
          highlightClass = 'highlight';
        }
      }
      return (
        <button
          type="button"
          className={`${highlightClass} stalls`}
          key={eachStall.id}
          onClick={(e) => {
          // use item's index to identify which stall the  user has selected
            displayStallInfoModal(e, index);
          }}
        >
          <BottomRowStallIcon />
        </button>
      );
    }
  });
  const middleRowSect1Stalls = listOfStalls.map((eachStall, index) => {
    let highlightClass = '';
    console.log('eachStall is:');
    console.log(eachStall);
    if ((getStallIndexFromUnitNum(eachStall.unitNum) >= 22) && (getStallIndexFromUnitNum(eachStall.unitNum) <= 25)) {
    // When a cuisine is selected, highlight the div of stalls that match that cuisine
      if (categoriesToHighlight !== null) {
        if ((`${eachStall.categoryId}` in categoriesToHighlight) && (categoriesToHighlight[`${eachStall.categoryId}`] === true)) {
          highlightClass = 'highlight';
        }
      }
      return (
        <button
          type="button"
          className={`${highlightClass} stalls`}
          key={eachStall.id}
          onClick={(e) => {
          // use item's index to identify which stall the  user has selected
            displayStallInfoModal(e, index);
          }}
        >
          <TopRowStallIcon />
        </button>
      );
    }
  });
  const middleRowSect2Stalls = listOfStalls.map((eachStall, index) => {
    let highlightClass = '';
    console.log('eachStall is:');
    console.log(eachStall);
    if ((getStallIndexFromUnitNum(eachStall.unitNum) >= 26) && (getStallIndexFromUnitNum(eachStall.unitNum) <= 33)) {
    // When a cuisine is selected, highlight the div of stalls that match that cuisine
      if (categoriesToHighlight !== null) {
        if ((`${eachStall.categoryId}` in categoriesToHighlight) && (categoriesToHighlight[`${eachStall.categoryId}`] === true)) {
          highlightClass = 'highlight';
        }
      }
      return (
        <button
          type="button"
          className={`${highlightClass} middleRowSect2Stalls`}
          key={eachStall.id}
          onClick={(e) => {
          // use item's index to identify which stall the  user has selected
            displayStallInfoModal(e, index);
          }}
        >
          <MiddleRowStallIcon />
        </button>
      );
    }
  });

  return (
    <>
      <div className="topRowSection1Container stallsContainer">
        {/* Stalls w/ unit 34-46 */}
        {stallsInTopRow}
      </div>

      <div className="middleRowsection1Container stallsContainer">
        {/* stalls w/ unit 22-26 */}
        {middleRowSect1Stalls}
      </div>
      <div className="middleRowsection2Container stallsContainer">
        {/* stalls w/ unit 27-33 */}
        {middleRowSect2Stalls}
      </div>
      <div className="bottomRowSection1Container stallsContainer">
        {/* stalls w/ unit 1 to 9 */}
        {bottomRowSect1Stalls}
      </div>

      <div className="bottomRowSection2Container stallsContainer">
        {/* Stalls w/ unit 10 to 21 */}

        {bottomRowSect2Stalls}
      </div>
    </>
  );
}
