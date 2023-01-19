import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends Component {
  render() {
    const { player } = this.props;
    const image = <img src={ `https://www.gravatar.com/avatar/${player.image}` } alt={ player.name } />;
    return (
      <>
        <table data-testid="ranking-title">
          <thead>
            <tr>
              <th data-testid="picture">Profile</th>
              <th data-testid="player-name">Player Name</th>
              <th data-testid="score-ranking">Pontuação</th>
              {/* <th>Excluir</th> */}
            </tr>
          </thead>
          <tbody>
            <tr key={ player }>
              <td>
                {image}
              </td>
              <td data-testid="player-name-0">
                { player.name }
              </td>
              <td data-testid="player-score-0">
                { player.score }
              </td>
              {/* <td>
                <button
                  type="button"
                  data-testid="delete-btn"
                  // onClick={ () => dispatch(delExpense(expense)) }
                  value="Excluir"
                >
                  Excluir
                </button>
              </td> */}
            </tr>
          </tbody>
        </table>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => {
            const { history } = this.props;
            history.push('/');
          } }
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
}.isRequired;

export default connect(mapStateToProps)(Ranking);
