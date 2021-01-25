import React, { useState } from 'react';
import CreateBill from './components/createBill.jsx';
import InputDinnerDetails from './components/inputDinnerDetails.jsx';

export default function App() {
  const [bill, setBill] = useState(null);
  /* Qn: why save the info as a state?
  ans: cos at the end of the app we wld need the info the update the db */
  return (
    <div>
      <h1> Hotpot app!</h1>
      {/* if the state of "bill" is null, render createBill component to create new Bill */}
      {/* if state of bill has data, rm createBill comp and render InputDinnerDetails comp */}
      {bill === null ? <CreateBill setBill={setBill} /> : <InputDinnerDetails /> }
      {/* ^^ passing the setBill fn above is known as "lifting", which we covered in class */}

    </div>
  );
}
