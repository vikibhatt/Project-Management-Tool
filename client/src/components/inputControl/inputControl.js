import React, { useState } from "react";
import {BsFillEyeFill,BsFillEyeSlashFill} from 'react-icons/bs'

import styles from "./inputControl.module.css";
import {motion} from 'framer-motion'

function InputControl({ label, isPassword, ...props }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <motion.div className={styles.container}
    initial ={{opacity: 0}}
    animate ={{opacity: 1}}
    exit = {{opacity: 0}}>
      {label && <label>{label}</label>}
      <div className={styles.inputContainer}>
        <input
          type={isPassword ? (isVisible ? "text" : "password") : "text"}
          {...props}
        />
        {isPassword && (
          <div className={styles.icon}>
            {isVisible ? (
              <BsFillEyeFill onClick={() => setIsVisible((prev) => !prev)} />
            ) : (
              <BsFillEyeSlashFill onClick={() => setIsVisible((prev) => !prev)} />
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default InputControl;

