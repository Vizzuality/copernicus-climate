import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import Icon from 'components/icon';
import './styles.scss';

function useClickOutside(ref, closeDropdown) {
  function handleClickOutside(event) {
    if (closeDropdown && ref.current && !ref.current.contains(event.target)) {
      closeDropdown();
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
}

function Dropdown({
  title,
  options,
  className,
  optionsTheme,
  handleClick,
  noBorderLeft = false,
  enabledOptions = options
}) {
  const [opened, open] = useState(false);
  const wrapperRef = useRef(null);
  const closeDropdown = () => open(false);
  useClickOutside(wrapperRef, closeDropdown);

  const onClickHandler = option => {
    handleClick(option);
    closeDropdown();
  };

  const isOptionClickable = option => {
    return enabledOptions && !!enabledOptions.find(o => o.value === option.value);
  };

  return (
    <div className={cx('c-dropdown', className, { 'dropdown-white': opened })} ref={wrapperRef}>
      <button className="dd-header" onClick={() => open(!opened)}>
        <div className="dd-header-title">{title}</div>
        <Icon name="icon-dropdown" className={cx('dropdown-icon', { __open: opened })} />
      </button>
      {opened && (
        <ul className={cx('dd-list', optionsTheme)}>
          {options &&
            options.map(opt => (
              <li className="dd-list-item" key={opt.value}>
                {opt.link ? (
                  <Link to={opt.link} className={cx('dd-item', { 'dropdown-white': opened })}>
                    {opt.label}
                  </Link>
                ) : (
                  <button
                    disabled={!isOptionClickable(opt)}
                    onClick={() => isOptionClickable(opt) && onClickHandler(opt)}
                    className={cx('dd-item', {
                      'dropdown-white': opened,
                      disabled: !isOptionClickable(opt),
                      noBorderLeft
                    })}
                  >
                    {opt.label}
                  </button>
                )}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

Dropdown.propTypes = {
  title: PropTypes.string,
  options: PropTypes.array,
  className: PropTypes.string,
  optionsTheme: PropTypes.string,
  handleClick: PropTypes.func,
  enabledOptions: PropTypes.array,
  noBorderLeft: PropTypes.bool
};

export default Dropdown;
