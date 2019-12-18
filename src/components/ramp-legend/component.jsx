import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import cx from 'classnames';
import Icon from 'components/icon';
import OpacityModal from './opacity-modal';

import styles from './styles.module.scss';

const RampLegend = ({
  title,
  lowEndValue,
  middleValue,
  highEndValue,
  lowEndName,
  middleName,
  highEndName,
  transparentRamp,
  colorRamp = [],
  activeSpecies
  // handleOpacity
}) => {
  const [legendOpen, toggleLegend] = useState(true);
  const [opacityModalOpen, setOpacityModalOpen] = useState(false);

  return (
    <div className={styles.legendContainer}>
      {legendOpen && (
        <div className={styles.legend}>
          {activeSpecies && (
            <div className={styles.speciesName}>
              Species:
              <span className={styles.italic}>&nbsp;{activeSpecies.name}</span>
            </div>
          )}
          <div className={styles.layerContainer}>
            <div className={styles.layerTitle}>{title}:</div>
            <div className={styles.rampContainer}>
              <span className={lowEndValue && styles.lowEndValue}>{lowEndValue}</span>
              <span className={middleValue && styles.middleValue}>{middleValue}</span>
              <span className={highEndValue && styles.highEndValue}>{highEndValue}</span>
              <div className={cx(styles.ramp, { [styles.transparent]: transparentRamp })}>
                <div
                  className={styles.colors}
                  style={{
                    background: transparentRamp
                      ? `linear-gradient(to right, rgba(193,191,234,0) 0%, rgba(255,255,255,1) 50%, rgba(${transparentRamp.colorRGBA.join(
                          ', '
                        )}) 100%)`
                      : `linear-gradient(0.25turn, ${colorRamp.join(', ')})`
                  }}
                />
              </div>
              <span className={styles.lowEndName}>{lowEndName}</span>
              <span className={styles.middleName}>{middleName}</span>
              <span className={styles.highEndName}>{highEndName}</span>
            </div>
          </div>
          <div className={styles.icons}>
            <button className={styles.button}>
              <Icon name="icon-info" />
            </button>
            <button
              className={styles.button}
              data-for="opacityTooltip"
              data-tip=""
              data-place="top"
              style={{ backgroundColor: opacityModalOpen ? '#EDECEA ' : 'white' }}
            >
              <Icon name="icon-opacity" />
            </button>
            <ReactTooltip
              id="opacityTooltip"
              clickable
              className="opacityTooltip"
              effect="solid"
              globalEventOff="click"
              event="click"
              place="top"
              afterShow={() => setOpacityModalOpen(true)}
              afterHide={() => setOpacityModalOpen(false)}
              offset={{ right: 68, top: 60 }}
            >
              <OpacityModal>jajco</OpacityModal>
            </ReactTooltip>
          </div>
        </div>
      )}
      <button
        className={cx(styles.toggleLegend, { [styles.legendClosed]: !legendOpen })}
        onClick={() => toggleLegend(!legendOpen)}
      >
        <Icon name="icon-arrow-left" />
      </button>
    </div>
  );
};

RampLegend.propTypes = {
  title: PropTypes.string, // title of the layer
  lowEndValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // text displaying on top-left corner of the legend
  middleValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // text displaying in the middle - top of the legend
  highEndValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // text displaying on top-right corner of the legend
  lowEndName: PropTypes.string, // text displaying on bottom-left corner of the legend
  middleName: PropTypes.string, // text displaying in the middle - bottom
  highEndName: PropTypes.string, // text displaying on bottom-right corner of the legend
  transparentRamp: PropTypes.shape({
    colorRGBA: PropTypes.array.isRequired // deepest color of the ramp in RGBA
  }), // if passed, ramp background would be set to have a transparent background-image (see alpha.png image in assets)
  // eslint-disable-next-line consistent-return
  colorRamp: props => {
    if (!props.transparentRamp) {
      return new Error('Please provide a ramp of colours array in HEX!');
    }
  },
  activeSpecies: PropTypes.oneOfType(PropTypes.object, PropTypes.string)
};

export default RampLegend;

/* Ramp Display
 *
 *   lowEndValue          highEndValue
 *
 *   |_______________________________|  ----- ramp
 *
 *   lowEndName            highEndName
 */
