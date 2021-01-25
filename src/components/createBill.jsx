import axios from 'axios';
import React, { useState } from 'react';

export default function CreateBill({ setBill }) {
  const [billName, setBillName] = useState('');

  const handleNewBill = (e) => {
    setBillName(e.target.value);
  };

  const submitNewBill = () => {
    axios.post('/createNewBill', { newBill: billName })
      .then(({ data }) => {
        console.log(data);
        setBill(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <input type="text" placeholder="Bill name" onChange={handleNewBill} />
      <button type="button" onClick={submitNewBill}> Submit</button>
      <p />
    </div>
  );
}
