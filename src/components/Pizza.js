import React from 'react';

const Pizza = (props) => {
  const vegetarianToString = props.vegetarian ? 'Yes' : 'No';
  return (
    <tr>
      <td>{props.topping}</td>
      <td>{props.size}</td>
      <td>{vegetarianToString}</td>
      <td>
        <button type="button" className="btn btn-primary" onClick={props.click}>
          Edit Pizza
        </button>
      </td>
    </tr>
  );
};

export default Pizza;
