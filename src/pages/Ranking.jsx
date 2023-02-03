import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { changeQuestionIndex, clearPlayerInfo } from '../redux/actions';

class Ranking extends Component {
  state = {
    triviaRanking: [],
  };

  componentDidMount() {
    const triviaRanking = JSON.parse(localStorage.getItem('triviaRanking')) || [];
    this.setState({ triviaRanking: triviaRanking.sort((a, b) => b.score - a.score) });
  }

  handleClick = () => {
    const { dispatch, history } = this.props;
    dispatch(changeQuestionIndex(0));
    dispatch(clearPlayerInfo());
    history.push('/');
  };

  render() {
    const { triviaRanking } = this.state;
    const tableRanking = triviaRanking.map(({ image, name, score }, index) => (
      <tr key={ image + name + (score * Math.random()) }>
        <td>
          <img src={ image } alt={ name } />
        </td>
        <td data-testid={ `player-name-${index}` }>{name}</td>
        <td data-testid={ `player-score-${index}` }>{score}</td>
      </tr>
    ));

    return (
      <>
        <table data-testid="ranking-title">
          <thead>
            <tr>
              <th>Profile</th>
              <th>Player Name</th>
              <th>Pontuação</th>
              {/* <th>Excluir</th> */}
            </tr>
          </thead>
          <tbody>
            {tableRanking}
          </tbody>
        </table>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ this.handleClick }
        >
          Logout
        </button>
      </>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  player,
});

Ranking.propTypes = {
  history: PropTypes.shape(),
  dispatch: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Ranking);
