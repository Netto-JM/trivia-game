import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

export class Feedback extends Component {
  render() {
  //   let contador;
  //   const valueMin = 3;
  //   handleFeedback = () => {
  //     if (contador < valueMin) {
  //       <p>Could be better...</p>;
  //     } else {
  //       <p>Well Done!</p>;
  //     }
  //   };

    return (
      <div data-testid="feedback-text">
        <Header />
      </div>
    );
  }
}

export default connect()(Feedback);
