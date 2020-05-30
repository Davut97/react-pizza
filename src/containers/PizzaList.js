import React, { useState, useEffect, Fragment } from 'react';
import Pizza from '../components/Pizza';
import PizzaForm from '../components/PizzaForm';
const PizzaList = () => {
  const [pizzas, setPizzas] = useState([]);
  const [selectedPizza, setSelectedPizza] = useState([]);
  const fetchDataHandler = async () => {
    const result = await fetch('http://localhost:3001/pizzas');
    const data = await result.json();
    setPizzas(data);
  };
  useEffect(() => {
    fetchDataHandler();
  }, []);
  const onEditHandler = (id) => {
    const foundPizza = pizzas.find((pizza) => pizza.id === id);
    setSelectedPizza(foundPizza);
  };
  const onSubmitPizza = async (selectedPizza) => {
    const data = await fetch(`http://localhost:3001/pizzas/${selectedPizza.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        topping: selectedPizza.topping,
        size: selectedPizza.size,
        vegetarian: selectedPizza.vegetarian === 'Vegetarian' ? true : false,
      }),
    });
    const res = await data.json();
    const pizzaCopy = [...pizzas];
    pizzaCopy.forEach((pizza) => {
      if (pizza.id === res.id) {
        pizza.topping = res.topping;
        pizza.size = res.size;
        pizza.vegetarian = res.vegetarian;
      }
    });
    setPizzas(pizzaCopy);
  };
  console.log(pizzas);
  // .then(
  //   (response) => {
  //     const updatedPizzas=[...pizzas]
  //     updatedPizzas.forEach(pizza =>{
  //       if (pizza.id === selectedPizza.id) {
  //         pizza.topping = selectedPizza.topping,
  //         pizza.size = selectedPizza.size,
  //         pizza.vegetarian = selectedPizza.vegetarian
  //       }
  //     })

  //     setPizzas(updatedPizzas);
  //   }),
  /*
  function postToy(toy_data) {
  fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": toy_data.name.value,
        "image": toy_data.image.value,
        "likes": 0

      })
    })
    .then(res => res.json())
    .then((obj_toy) => {
      let new_toy = renderToys(obj_toy)
      divCollect.append(new_toy)
    })
}
   
  */

  return (
    <Fragment>
      <PizzaForm submit={onSubmitPizza} key={selectedPizza.id} id={selectedPizza.id} topping={selectedPizza.topping} size={selectedPizza.size} vegetarian={selectedPizza.vegetarian ? 'Vegetarian' : 'Not Vegetarian'} />
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Topping</th>
            <th scope="col">Size</th>
            <th scope="col">Vegetarian?</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {pizzas.map((pizza) => {
            return <Pizza key={pizza.id} id={pizza.id} topping={pizza.topping} size={pizza.size} vegetarian={pizza.vegetarian} click={() => onEditHandler(pizza.id)} />;
          })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default PizzaList;
