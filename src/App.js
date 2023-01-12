import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import LoginScreen from './pages/LoginScreen';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ LoginScreen } />
    </Switch>
  );
}
