/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { HEADER_MENU_FIRST, HEADER_MENU_SECOND } from 'constants.js';
import BgHeader from 'assets/img/bg-header.png';
import LogoImage from 'assets/img/c3s-logo.svg';
import LogosBlock from '../LogosBlock';
import SubHeader from './components/SubHeader';
import styles from './styles.module.scss';
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
      <header
        role="banner"
        className={styles.banner}
        style={{ backgroundImage: `url(${BgHeader})` }}
      >
        <div className={styles.banner__inner}>
          <input
            type="checkbox"
            name="mobile-menu-toggle"
            id="mobile-menu-toggle"
            className={styles['mobile-menu-box']}
          />
          <div className={styles.banner__logo}>
            <p className={styles['info-link']}>
              Implemented by <a href="https://www.ecmwf.int">ECMWF</a> as part of{' '}
              <a href="/" onClick={e => clickToProgram(e)}>
                The Copernicus Programme
              </a>
            </p>
            <Link to="/" title="Home" rel="home" id="logo">
              <img className={styles.logo} src={LogoImage} height="66" alt="Home" />
            </Link>
          </div>
          <div className={styles.menus}>
            <div className={styles['nav__main-wrapper']}>
              <nav role="navigation">
                <ul block="ce_main_menu" className={styles.nav__main}>
                  {HEADER_MENU_SECOND.map((m, key) => (
                    <li key={key} className={styles['menu-item menu-item--collapsed']}>
                      <MenuLink
                        m={m}
                        target={m.fullUrl ? '_blank' : '_self'}
                        to={m.fullUrl ? m.fullUrl : m.link}
                        title={m.title}
                      >
                        {m.title}
                      </MenuLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className={styles['nav__sub-wrapper']}>
              <nav role="navigation">
                <ul block="secondarynavigation" className={styles.nav__sub}>
                  {HEADER_MENU_FIRST.map((m, key) => (
                    <li key={key} className={styles['menu-item']}>
                      <MenuLink
                        m={m}
                        target={m.fullUrl ? '_blank' : '_self'}
                        to={m.fullUrl ? m.fullUrl : m.link}
                        title={m.title}
                      >
                        {m.title}
                      </MenuLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
          {/* This section disabled temporary */}
          {/* <div className={styles['mobile-menu-labels']}>
            <label
              htmlFor="mobile-menu-toggle"
              className={cx(styles['mobile-menu-label'], styles.hidden)}
            />
            <label
              htmlFor="search-toggle"
              className={cx(styles['search-toggle'], styles['search-label'])}
              onClick={e => clickToSearch(e)}
            />
          </div> */}
        </div>
      </header>
      <LogosBlock barRef={barRef} outerHeight={logosOuterHeight} onClose={clickToProgram} />
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
