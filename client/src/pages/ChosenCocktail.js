import React, { useState, useEffect } from 'react';
import { getChosenCocktail, saveDrink } from '../utils/api';

function ChosenCocktail(props) {
  const [cocktailDataObj, setCocktailDataObj] = useState({
    name: "",
    image: "",
    glassType: "",
    instructions: "",
    ingredients: []
  });

  console.log('what');

  useEffect(() => {
    console.log("hi there!")
    console.log(props);
    handleGetChosenCocktail(props.match.params.id || "");
  }, []);

  function handleSaveDrink() {
    saveDrink(cocktailDataObj)
      .then(({data}) => {
        console.log(data);
      })
      .catch(err => console.log(err));
  }


  function handleGetChosenCocktail(drinkID) {
    getChosenCocktail(drinkID)
      .then(({ data: cocktailData }) => {
        console.log(cocktailData)
        const drink = cocktailData.drinks[0];
        const cocktailDataObj = {};
        cocktailDataObj.name = drink.strDrink;
        cocktailDataObj.image = drink.strDrinkThumb;
        cocktailDataObj.glassType = drink.strGlass;
        cocktailDataObj.instructions = drink.strInstructions;

        cocktailDataObj.ingredients = Object.entries(drink).filter(entry => {
          if (entry[0].includes("Ingredient") && entry[1] !== "") {
            return entry
          }
        }).map(ingredient => ingredient[1]);

        cocktailDataObj.measurements = Object.entries(drink).filter(entry => {
          if (entry[0].includes("Measure") && entry[1] !== 0) {
            return entry
          }
        }).map(measurement => measurement[1]);


        console.log(cocktailDataObj);
        setCocktailDataObj(cocktailDataObj);
      })
      .catch(err => (console.log(err)))

    

  }
  const style = {
    chosenCard: {
      marginLeft: 270

    }
  }
  return (
    <React.Fragment>
      <div className="col-12 col-md-6" style={style.chosenCard} id="chosenCard">
        <div className="card">
          <img class="card-img-top" src={cocktailDataObj.image} alt="Card image cap" />
          <div className="card-body">
            <h2>Name: {cocktailDataObj.name}</h2>
            Glass Type: {cocktailDataObj.glassType}<br />
            Instructions: {cocktailDataObj.instructions}<br /><br />
            Ingredients:<br />
            <ul className="list-group list-group-flush">
              {cocktailDataObj.ingredients.map((ingredient, index) => {
                return (
                  <li key={ingredient} className="list-group-item">{cocktailDataObj.measurements[index] ? `${cocktailDataObj.measurements[index]} - ` : ""}{ingredient}</li>
                )
              })}
            </ul>
            <button 
            onClick={handleSaveDrink}
            className="btn btn-block btn-success">
              Save This Drink
            </button>
          </div>
          
        </div>
      </div>
    </React.Fragment>
  )
}

export default ChosenCocktail;

