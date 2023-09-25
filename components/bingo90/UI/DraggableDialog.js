// Dialog.js
import React from "react";
import style from "../../../styles/bingo90/draggableDialog.module.scss";
import Draggable from "react-draggable";

const DraggableDialog = ({ children, position, width }) => {
  return (
    <Draggable handle=".drag-handle" cancel=".cancel-here">
      <div
        className={style.dialogContent}
        style={{position, width}}
      >
        <div className="drag-handle" style={{width:"100%", marginBottom:"20px", height:"30px"}}></div>
        
        {children}
        <div className="drag-handle" style={{width:"100%", marginBottom:"20px", height:"30px"}}></div>
      </div>
    </Draggable>
  );
};

export default DraggableDialog;
