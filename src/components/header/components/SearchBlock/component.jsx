/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './styles.module.scss';

const SearchBlock = ({ searchRef = null, outerHeight = 0 }) => {
  return (
    <div className={styles['search-bar-box']} ref={searchRef} style={{ height: outerHeight }}>
      <div className={styles['search-bar']}>
        <div className={styles.bar__inner}>
          <div className={styles['site-header-search']}>
            <form className={styles['views-exposed-form']} method="get">
              <div className={styles['form--inline']}>
                <div>
                  <label htmlFor="edit-search-api-fulltext">Search this site</label>
                  <input
                    type="text"
                    id="edit-search-api-fulltext"
                    name="search_api_fulltext"
                    size="30"
                    maxLength="128"
                    className={styles['form-text']}
                  />
                </div>
                <div className={styles['form-wrapper']} id="edit-actions--5">
                  <input
                    type="submit"
                    id="edit-submit-sitewide-search"
                    value="Search"
                    className={cx('button', styles['form-submit'])}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

SearchBlock.propTypes = {
  searchRef: PropTypes.any,
  outerHeight: PropTypes.number || PropTypes.string
};

export default SearchBlock;
