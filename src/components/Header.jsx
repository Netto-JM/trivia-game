import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { player, score } = this.props;
    const { image, name } = player;

    return (
      <div>
        <img src={ image } data-testid="header-profile-picture" alt={ name } />
        <span>{' '}</span>
        <span>{' '}</span>
        <span>Player: </span>
        <span data-testid="header-player-name">{ name }</span>
        <span>{' '}</span>
        <span>{' '}</span>
        <span>Score: </span>
        <span data-testid="header-score">{ score }</span>
      </div>
    );
  }
}

Header.defaultProps = {
  player: {
    image: '',
    name: '',
    email: '',
  },
};

Header.propTypes = {
  player: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ player }) => ({
  player,
  score: player.score,
});

export default connect(mapStateToProps)(Header);
