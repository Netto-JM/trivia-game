import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import LoginScreen from './pages/LoginScreen';
import Settings from './pages/Settings';
import Game from './pages/Game';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ LoginScreen } />
      <Route exact path="/settings" component={ Settings } />
      <Route exact path="/game" component={ Game } />
    </Switch>
  );
}
