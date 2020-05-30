import React, { useState } from 'react';

const PizzaForm = (props) => {
  const [enteredTopping, setEnteredTopping] = useState(props.topping || 'Plain');
  const [enteredSize, setEnteredSize] = useState(props.size || 'Small');
  const [enteredType, setEnteredType] = useState(props.vegetarian);
  const submitHandler = (event) => {
    event.preventDefault();
    props.submit({ topping: enteredTopping, size: enteredSize, id: props.id, vegetarian: enteredType === 'Vegetarian' ? true : false });
  };
  return (
    <div className="form-row">
      <div className="col-5">
        <input type="text" className="form-control" name="topping" placeholder={props.topping} value={enteredTopping} onChange={(event) => setEnteredTopping(event.target.value)} />
      </div>
      <div className="col">
        <select value={enteredSize} onChange={(event) => setEnteredSize(event.target.value)} className="form-control">
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </div>
      <div className="col">
        <div className="form-check">
          <input className="form-check-input" type="radio" value="Vegetarian" checked={enteredType === 'Vegetarian'} onChange={(event) => setEnteredType(event.target.value)} />
          <label className="form-check-label">Vegetarian</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" value="Not Vegetarian" checked={enteredType === 'Not Vegetarian'} onChange={(event) => setEnteredType(event.target.value)} />
          <label className="form-check-label">Not Vegetarian</label>
        </div>
      </div>
      <div className="col">
        <button type="submit" className="btn btn-success" onClick={submitHandler}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default PizzaForm;
