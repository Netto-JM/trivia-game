import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { user } = this.props;
    const { image, name, score } = user;

    return (
      <div>
        <img src={ image } data-testid="header-profile-picture" alt={ name } />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </div>
    );
  }
}

Header.defaulProps = {
  user: {
    image: 'url image',
    name: 'common name',
    score: 0,
  },
};

Header.propTypes = {
  user: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    score: PropTypes.number,
  }),
}.isRequired;

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps)(Header);
