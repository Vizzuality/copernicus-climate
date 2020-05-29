import React from 'react';
import Loader  from 'react-spinners/ClipLoader';
import styles from './styles.module.scss';

const LoaderComponent = () => (
  <div className={styles.loaderBox}>
    <div>
      <Loader 
        color="#941333"
        radius={0}
        margin="3px"
        width={4}
        height={24}
      />
    </div>
  </div>
);

export default LoaderComponent;