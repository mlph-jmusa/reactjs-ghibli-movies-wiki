import './App.css';
import React from 'react';
import MovieDetails from './pages/movieDetails';
import MoviesList from './pages/moviesList';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import NotFound from './pages/notFound';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/list">
          <div className="App">
            <header className="App-header">
              <MoviesList />
            </header>
          </div>
        </Route>
        <Route
          path="/list/:id">
          <div className="App">
            <header className="App-header">
              <MovieDetails/>
            </header>
          </div>
        </Route>
        <Route path="/404">
        <div className="App">
          <header className="App-header">
            <NotFound/>
          </header>
        </div>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
