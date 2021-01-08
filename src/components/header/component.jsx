/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import LogosBlock from '../LogosBlock';
import SubHeader from './components/SubHeader';
/* This section disabled temporary */
// import SearchBlock from './components/SearchBlock';

const MenuLink = ({ m, to, ...props }) =>
  m && m.fullUrl ? <a href={to} {...props} /> : <Link {...props} />;

const HeaderComponent = () => {
  const barRef = useRef({});
  const [logosOuterHeight, setLogosOuterHeight] = useState(0);
  const [isOpen, setOpen] = useState(false);

  const clickToProgram = e => {
    e.preventDefault();
    setOpen(!isOpen);
    const panel = barRef.current;
    const height = logosOuterHeight ? 0 : panel.scrollHeight;
    setLogosOuterHeight(height);
  };

  /* This section disabled temporary */
  /*
  const searchRef = useRef({});
  const [searchOuterHeight, setSearchOuterHeight] = useState(0);
  const clickToSearch = e => {
    e.preventDefault();
    setOpen(!isOpen);
    const panel = searchRef.current;
    const height = searchOuterHeight ? 0 : panel.scrollHeight;
    setSearchOuterHeight(height);
  };
  */

  return (
    <>
      <LogosBlock
        barRef={barRef}
        outerHeight={logosOuterHeight}
        onClose={clickToProgram}
      />
      {/* This section disabled temporary */}
      {/* <SearchBlock position="header" searchRef={searchRef} outerHeight={searchOuterHeight} /> */}
      <SubHeader />
    </>
  );
};

MenuLink.propTypes = {
  m: PropTypes.any,
  to: PropTypes.string
};

export default HeaderComponent;
