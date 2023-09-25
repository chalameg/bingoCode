import React, { useState } from 'react';
import style from '../../../styles/bingo90/customDialog.module.css'

const CustomDialog = (props) => {

  return (
    <div className={`${style.customDialog} ${props.isOpen ? style.open : ''}`}>
      {props.children}
    </div>
  );
};

export default CustomDialog;
