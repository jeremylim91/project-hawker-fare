import React, { useState } from 'react';
import LineItemInput from './lineItemInput.jsx';
import BillByLineItems from './billByLineItems.jsx';
import TotalBill from './totalBill.jsx';

export default function InputDinnerDetails() {
  console.log('rendered inputDInnerDetails');

  const [infoMasterList, setInfoMasterList] = useState({
    itemDetails: [],
    people: [],
  });

  const updateItemDetailsInMasterList = (itemName, itemPrice) => {
    setInfoMasterList((prevState) => {
      // append the new item and price to the existing state object.
      const newState = { ...prevState };
      newState.itemDetails.push({
        name: itemName,
        price: itemPrice,
      });
      return newState;
      /* This did NOT work becos it was modifying the state directly
      (note how newState and prevState are altering the data at the same address):
      const newState= prevState.itemDetails.push({
        name: itemName,
        price: itemPrice,
      });
      return newState;    */
    });
  };

  const updatePeopleInMasterList = (attendeeName) => {
    setInfoMasterList((prevState) => {
      const newState = { ...prevState };
      newState.people.push(attendeeName);
      return newState;
    });
  };

  return (
    <div>
      {/* Input all items that were ordered at the meal, as well as all attendees */}
      <LineItemInput updateItemDetailsInMasterList={updateItemDetailsInMasterList} updatePeopleInMasterList={updatePeopleInMasterList} />

      <button type="button" onClick={() => { console.log(infoMasterList); }}>Test Button</button>

      {/* display total price based on input from above */}
      <TotalBill infoMasterList={infoMasterList} />

      {/* List each line item and allow user to input underwriters for each lineItem  */}
      <BillByLineItems infoMasterList={infoMasterList} />

      {/* list all attendees and how much each person owes */}
      {/* <MealAttendeesConsolidated /> */}

      {/* Button that will execute all the db updates for the above */}
      {/* <button type="button"> Submit</button> */}
    </div>
  );
}
