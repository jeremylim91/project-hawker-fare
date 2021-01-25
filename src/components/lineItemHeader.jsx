import React, { useState } from 'react';
import PersonDropdown from './personDropdown.jsx';

export default function LineItemHeader({ infoMasterList }) {
  // destructure
  const { itemDetails } = infoMasterList;
  console.log('itemDetails IS:');
  console.log(itemDetails);
  // use map to ad an <li> so that all the items can appear
  const listOfLineItems = itemDetails.map((lineItem, index) => (
    <li key={index + 1}>
      <span>{lineItem.name}</span>
      <span className="price">
        $

        {lineItem.price}
      </span>
      <PersonDropdown infoMasterList={infoMasterList} />
    </li>
  ));
  return (
    listOfLineItems
  );
}
