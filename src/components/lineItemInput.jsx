import React, { useState } from 'react';

export default function LineItemInput({ updateItemDetailsInMasterList, updatePeopleInMasterList }) {
  const [lineItem, setLineItem] = useState('');
  const [lineItemPrice, setLineItemPrice] = useState('');
  const [attendeeName, setAttendeeName] = useState('');

  // update the state of the line item name
  const handleLineItemInput = (e) => {
    // setLineItem(e.target.value);
    setLineItem(e.target.value);
  };
    // update the state of the line item price
  const handleLineItemPriceInput = (e) => {
    // setLineItemPrice(e.target.value);
    setLineItemPrice(e.target.value);
  };
  const handleAttendeeInput = (e) => {
    setAttendeeName(e.target.value);
  };

  return (
    <div>
      <input type="text" placeholder="Food Item" onChange={handleLineItemInput} />
      <input type="decimal" placeholder="Price" onChange={handleLineItemPriceInput} />
      <button type="button" onClick={() => { updateItemDetailsInMasterList(lineItem, lineItemPrice); }}> Submit Line Items Info</button>

      <input type="text" placeholder="Attendee name" onChange={handleAttendeeInput} />
      <button type="button" onClick={() => { updatePeopleInMasterList(attendeeName); }}> Submit Attendee Name</button>

    </div>

  );
}
