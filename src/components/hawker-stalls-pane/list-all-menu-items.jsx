import React from 'react';

export default function ListAllMenuItems({ stallDetails }) {
  // use .map to insert li elements
  const listElsOfMenuItems = stallDetails.menu.map((eachMenuItem) => (
    <li key={stallDetails.id}>
      {eachMenuItem}
    </li>
  ));
  return (
    <ul>
      {listElsOfMenuItems}
    </ul>
  );
}
