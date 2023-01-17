import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { user, score } = this.props;
    const { image, name } = user;
    const imageUrl = (hash) => `https://www.gravatar.com/avatar/${hash}`;

    return (
      <div>
        <img src={ imageUrl(image) } data-testid="header-profile-picture" alt={ name } />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </div>
    );
  }
}

Header.defaultProps = {
  user: {
    image: '',
    name: '',
    email: '',
  },
};

Header.propTypes = {
  user: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ user, game }) => ({
  user,
  score: game.score,
});

export default connect(mapStateToProps)(Header);
