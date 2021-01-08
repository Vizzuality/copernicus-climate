/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styles from './styles.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.createdBy}>
        Created using data from the{' '}
        <a
          href="https://climate.copernicus.eu"
          target="_blank"
          rel="noopener noreferrer"
        >
          Copernicus Climate Change Service
        </a>
      </div>
      <div className={styles.developedBy}>
        Developed by:
        <a
          href="https://www.tecnalia.com/en/energy-and-environment/offer-to-companies/environment-and-sustainability/climate-change-adaptation.htm"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/logos/tecnalia.png" alt="Tecnalia" />
        </a>
        <a
          href="https://www.vizzuality.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/logos/vizzuality.svg" alt="Vizzuality" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
