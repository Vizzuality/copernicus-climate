import React, { useState } from 'react';
import { useLocation, useRouteMatch } from 'react-router-dom';

import Component from './component';

const Header = () => {
  const [menuOpen, showMenu] = useState(false);
  const { pathname } = useLocation();
  const match = useRouteMatch('/:country/:type');
  const { country, type } = (match && match.params) || {};
  const isHome = pathname === '/';
  const isSpeciesDistribution = ['species', 'distribution'].includes(type);

  const urls = {
    species: type === 'species' ? '#' : `/${country}/species`,
    distribution: type === 'distribution' ? '#' : `/${country}/distribution`,
    bioclimatic: type === 'bioclimatic' ? '#' : `/${country}/bioclimatic`
  };

  return (
    <Component
      type={type}
      isHome={isHome}
      isSpeciesDistribution={isSpeciesDistribution}
      urls={urls}
      menuOpen={menuOpen}
      showMenu={showMenu}
    />
  );
};

export default Header;
