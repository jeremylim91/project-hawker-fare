import React, {
  useState, useEffect, memo, useMemo,
} from 'react';
import axios from 'axios';
import getStallIndexFromUnitNum from '../../helperFns/get-stall-index.mjs';
// import CreateTopRowStalls from './create-top-row-stalls.jsx';
// import MiddleRowStallIcon from '../../icons/Svg-for-stalls-middle-row.jsx';
// import BottomRowStallIcon from '../../icons/Svg-for-stalls-bottom-row.jsx';
// import TopRowStallIcon from '../../icons/Svg-for-stalls-top-row.jsx';
import { ReactComponent as MiddleRowStallIcon } from '../../icons/Svg-For-Stalls-Middle-Row-2.svg';
import { ReactComponent as BottomRowStallIcon } from '../../icons/Svg-For-Stalls-Bottom-Row-2.svg';
import { ReactComponent as TopRowStallIcon } from '../../icons/Svg-For-Stalls-Top-Row-2.svg';

const MakeStallEls = ({ categoriesToHighlight, updateStallDetails, handleShow }) => {
  const [listOfStalls, setListOfStalls] = useState([]);

  // query the db to get stall info so stalls can be displayed
  useEffect(() => {
    // axios request to db
    axios.get('/getStallDetails')
      .then(({ data }) => {
        // console.log('axios data of all stalls are:');
        // console.log(data);
        // update state with new data
        setListOfStalls(data);
      })
      .catch((error) => (console.log(error)));
  }, []);

  // handle what happens when the user clicks on a stall
  const displayStallInfoModal = (e, index) => {
    // update the state with details of the stall that user selected
    // note: have to offset by -1 becos dealing w/ array vs stall num
    updateStallDetails(listOfStalls[index]);
    handleShow();
  };

  const createStallsInRange = (SMALLEST_UNIT_NUM_IN_RANGE, LARGEST_UNIT_NUM_IN_RANGE, componentToUse, additionalClassNames) => {
    // loop thru all stalls using a map
    const createStallsAsButtonEls = listOfStalls.map((eachStall, index) => {
      console.log('index is');
      console.log(index);

      // set a variable that will change if a stall el should be circled/highlighted
      let highlightClass = '';

      // if the curr stall falls outside the specified range, don't build the stall el.
      if ((getStallIndexFromUnitNum(eachStall.unitNum) < SMALLEST_UNIT_NUM_IN_RANGE) || (getStallIndexFromUnitNum(eachStall.unitNum) > LARGEST_UNIT_NUM_IN_RANGE)) return false;

      // When a cuisine is selected, check e corresponding key/value pair in CategoriesToHighlight to see if the value is true
      if ((categoriesToHighlight !== null) && (categoriesToHighlight[`${eachStall.categoryId}`] === true)) { highlightClass = 'highlight'; }
      // return for .map

      return (
        <button
          type="button"
          className={`${highlightClass} stalls ${additionalClassNames}`}
          key={eachStall.id}
          onClick={(e) => {
          // use item's index to identify which stall the  user has selected
            displayStallInfoModal(e, index);
          }}
        >
          {componentToUse}
        </button>
      );
    });
    return createStallsAsButtonEls;
  };

  return (
    <>
      <div className="topRowSection1Container stallsContainer">
        {/* Stalls w/ unit 34-46 */}
        {useMemo(() => createStallsInRange(34, 46, <TopRowStallIcon />, ''), [listOfStalls, categoriesToHighlight]) }
      </div>
      {/* Middle row stalls */}
      <div className="middleRowsection1Container stallsContainer">
        {/* stalls w/ unit 22-26 */}
        {/* {middleRowSect1Stalls} */}
        {useMemo(() => createStallsInRange(22, 26, <TopRowStallIcon />, ''), [listOfStalls, categoriesToHighlight]) }

      </div>
      <div className="middleRowsection2Container stallsContainer">
        {/* stalls w/ unit 27-33 */}
        {/* {useMemo(() => middleRowSect2Stalls, [listOfStalls])} */}
        {useMemo(() => createStallsInRange(27, 33, <MiddleRowStallIcon />, 'middleRowSect2Stalls'), [listOfStalls, categoriesToHighlight]) }

        {/* {createStallsInRange(27, 33, <MiddleRowStallIcon className="middleRowSect2Stalls" />)} */}

      </div>
      {/* Bottom row stalls */}
      <div className="bottomRowSection1Container stallsContainer">
        {/* stalls w/ unit 1 to 9 */}
        {/* {bottomRowSect1Stalls} */}
        {useMemo(() => createStallsInRange(1, 9, <BottomRowStallIcon />, ''), [listOfStalls, categoriesToHighlight]) }

      </div>
      <div className="bottomRowSection2Container stallsContainer">
        {/* Stalls w/ unit 10 to 21 */}
        {useMemo(() => createStallsInRange(10, 21, <BottomRowStallIcon />, ''), [listOfStalls, categoriesToHighlight]) }

        {/* {bottomRowSect2Stalls} */}
      </div>
    </>
  );
};

export default MakeStallEls;
