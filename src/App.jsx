import React, { useState } from 'react';
import HawkerDisplay from './components/hawker-display.jsx';
import NavBar from './components/nav-bar.jsx';

export default function App() {
  const [categoryIdState, setCategoryIdState] = useState(null);

  const changeCategoryId = (value) => {
    console.log('value is:');
    console.log(value);
    setCategoryIdState(value);
  };
  return (
    <div>
      <h1> Serangoon market!</h1>

      <NavBar changeCategoryId={changeCategoryId} categoryIdState={categoryIdState} />
      <HawkerDisplay categoryIdState={categoryIdState} />

    </div>
  );
}
