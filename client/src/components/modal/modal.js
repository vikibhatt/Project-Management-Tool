import React, { useState } from 'react';
import styles from './modal.module.css';
import {motion} from 'framer-motion'

function Modal(props) {
  return (
    <motion.div className={styles.container} onClick={() => props.onClose ? props.onClose() : ''}
    initial ={{opacity: 0}}
    animate ={{opacity: 2}}
    exit = {{opacity: 0}}>
      <div className={styles.inner} onClick = {(event) => event.stopPropagation()}>
        {props.children}
      </div>
    </motion.div>
  );
}

export default Modal;