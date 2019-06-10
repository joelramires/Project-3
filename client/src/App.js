import React from 'react';
import RandomCocktail from './pages/RandomCocktail';
import CocktailSearch from './pages/CocktailSearch'
import ChosenCocktail from './pages/ChosenCocktail';
import NavBar from './components/NavBar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Jumbotron from './components/jumbotron'
import Form from './pages/Form'


function App() {


  return (
    <Router>
      <React.Fragment>
        <NavBar />
        <Jumbotron />
        <Switch>
          <Route exact path="/RandomCocktail" component={RandomCocktail} />
          <Route exact path="/CocktailSearch" component={CocktailSearch} />
          <Route exact path="/cocktail-details/:id" component={ChosenCocktail}/>
          <Route exact path="/Form" component={Form} />
        </Switch>
      </React.Fragment>
    </Router>
  );
}

export default App;
