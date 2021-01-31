import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function HawkerDisplay({ categoryIdState }) {
  const [listOfStalls, setListOfStalls] = useState([]);

  // make a db req to get info on all the stalls
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

  // use .map to surround each array el in a div tag
  const MakeDivsForStalls = () => listOfStalls.map((eachStall) => {
    let highlightClass = '';
    console.log('eachStall.categoryId is:');
    console.log(eachStall.categoryId);

    console.log('categoryIdState is:');
    console.log(categoryIdState);

    if (categoryIdState !== null) {
      console.log('categoryIdState[`${eachStall.categoryId}`] is:');
      console.log(categoryIdState[`${eachStall.categoryId}`]);
      if ((`${eachStall.categoryId}` in categoryIdState) && (categoryIdState[`${eachStall.categoryId}`] === true)) {
        highlightClass = 'highlight';
      }
    }
    // if (eachStall.categoryId === categoryIdState) {
    //   highlightClass = 'highlight';
    // }
    return <div className={highlightClass} key={eachStall.id}>{eachStall.name}</div>;
  });
  return (

    <div className="hawkerDisplay-container">
      This is Hawker Display Div Element
      <MakeDivsForStalls />
      <svg width="100" height="100">
        <circle cx="50" cy="50" r="40" stroke="green" strokeWidth="4" fill="yellow" />
      </svg>
      <svg height="100%" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width="100%" xmlns:vectornator="http://vectornator.io" version="1.1" viewBox="0 0 3840 2160">
        <metadata>
          <vectornator:setting key="DimensionsVisible" value="1" />
          <vectornator:setting key="SnapToGrid" value="1" />
          <vectornator:setting key="SnapToPoints" value="0" />
          <vectornator:setting key="GuidesVisible" value="1" />
          <vectornator:setting key="RulersVisible" value="1" />
          <vectornator:setting key="CMYKEnabledKey" value="0" />
          <vectornator:setting key="SnapToEdges" value="0" />
          <vectornator:setting key="DisplayWhiteBackground" value="1" />
          <vectornator:setting key="SnapToGuides" value="1" />
          <vectornator:setting key="GridSpacing" value="36" />
          <vectornator:setting key="Units" value="Pixels" />
          <vectornator:setting key="DynamicGuides" value="1" />
          <vectornator:setting key="New" value="1" />
        </metadata>
        <defs />
        <g id="Layer 1" vectornator:layerName="Layer 1">
          <g opacity="1">
            <path stroke="#f5eeee" strokeOpacity="0" strokeWidth="1" d="M1074.34+461.649L1799.83+905.298L1799.83+1348.95L1443.82+1131.24L1074.34+905.298L1074.34+461.649Z" fill="#ffffff" strokeLinecap="butt" opacity="1" strokeLinejoin="round" />
            <path stroke="#f5eeee" strokeOpacity="0" strokeWidth="1" d="M1074.34+461.649L1799.83+18L2525.33+461.649L1799.83+905.298L1074.34+461.649Z" fill="#ffffff" strokeLinecap="butt" opacity="1" strokeLinejoin="round" />
            <path stroke="#adb1b2" strokeOpacity="0" strokeWidth="1" d="M1074.34+461.649L1799.83+905.298L1799.83+1348.95L1074.34+905.298L1074.34+461.649Z" fill="#eff6f9" strokeLinecap="butt" opacity="1" strokeLinejoin="round" />
            <path stroke="#f5eeee" strokeOpacity="0" strokeWidth="1" d="M1074.34+905.298L1369.31+1085.68L1799.83+1348.95L1799.83+2088.36L1074.34+1644.71L1074.34+905.298Z" fill="#cbd4d8" strokeLinecap="butt" opacity="1" strokeLinejoin="round" />
            <path stroke="#f5eeee" vectornator:shadowColor="#000000" vectornator:shadowOffset="10" strokeWidth="0.1" fill="#e1e8eb" strokeLinecap="butt" vectornator:shadowAngle="1.5708" strokeLinejoin="round" opacity="1" vectornator:shadowRadius="10" d="M1074.34+461.649L1799.83+18L2525.33+461.649L1799.83+905.298L1074.34+461.649Z" strokeOpacity="0" vectornator:shadowOpacity="0" />
            <path stroke="#f5eeee" strokeOpacity="0" strokeWidth="1" d="M1799.83+905.298L2525.33+461.649L2525.33+1644.71L1799.83+2088.36L1799.83+905.298Z" fill="#afb4b7" strokeLinecap="butt" opacity="1" strokeLinejoin="round" />
            <path stroke="#e1e8eb" vectornator:shadowColor="#797d7f" vectornator:shadowOffset="0" strokeWidth="1" fill="#cbd4d8" strokeLinecap="butt" vectornator:shadowAngle="0.415828" strokeLinejoin="round" opacity="1" vectornator:shadowRadius="7.15859" d="M1074.34+461.649L1074.34+1644.71" vectornator:shadowOpacity="1" />
            <path stroke="#e1e8eb" vectornator:shadowColor="#797d7f" vectornator:shadowOffset="0" strokeWidth="1" fill="#cbd4d8" strokeLinecap="butt" vectornator:shadowAngle="0.415828" strokeLinejoin="round" opacity="1" vectornator:shadowRadius="6.8282" d="M1799.83+18L1074.34+461.649" vectornator:shadowOpacity="1" />
          </g>
          <path stroke="#e1e8eb" strokeWidth="1" d="M1387.37+747L1387.37+747L1387.37+765L1387.37+765L1387.37+747Z" fill="#cbd4d8" strokeLinecap="butt" opacity="1" strokeLinejoin="round" />
        </g>
      </svg>

    </div>

  );
}
