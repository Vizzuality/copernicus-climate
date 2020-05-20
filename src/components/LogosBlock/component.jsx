import React from 'react';
import PropTypes from 'prop-types';
import ImageLogoEC from 'assets/img/logo-ec.png';
import ImageLogoCopernicus from 'assets/img/logo-copernicus.png';
import ImageLogoEcmwf from 'assets/img/logo-ecmwf.png';
import cx from 'classnames';
import styles from './styles.module.scss';

const logos = [
  {
    key: 'ec',
    image: ImageLogoEC,
    title: 'European Commission',
    href: 'http://ec.europa.eu/'
  },
  {
    key: 'copernicus',
    image: ImageLogoCopernicus,
    title: 'Copernicus',
    href: 'http://www.copernicus.eu/'
  },
  {
    key: 'ecmwf',
    image: ImageLogoEcmwf,
    title: 'ECMWF',
    href: 'https://www.ecmwf.int/'
  }
];

const LogosBlock = ({
  position = 'header',
  onClose = () => {},
  barRef = null,
  outerHeight = 0
}) => {
  const onCloseBar = e => {
    e.preventDefault();
    onClose(e);
  };

  const isFooter = position === 'footer';
  const mainClass = [styles['c-logos-block-section']];
  if (isFooter) {
    mainClass.push(styles.isFooter);
  }

  return (
    <div
      ref={barRef}
      className={mainClass.join(' ')}
      style={{ height: isFooter ? 'auto' : outerHeight }}
    >
      <div className={styles.bar}>
        <div className={styles.bar__inner}>
          <div className={styles['logos-block']}>
            {logos.map(logo => (
              <a key={logo.key} href={logo.href}>
                <img
                  className={cx(styles.logo, logo.key)}
                  src={logo.image}
                  title={logo.title}
                  alt={logo.title}
                />
              </a>
            ))}
            {!isFooter && (
              <a href="/" onClick={e => onCloseBar(e)} className={styles.button}>
                <svg>
                  <use xlinkHref="#icon-cross" />
                </svg>
                close
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

LogosBlock.propTypes = {
  position: PropTypes.string,
  onClose: PropTypes.func,
  barRef: PropTypes.any,
  outerHeight: PropTypes.number || PropTypes.string
};

export default LogosBlock;
