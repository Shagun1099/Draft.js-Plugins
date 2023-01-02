import React from "react";
import  { getBase64 } from "../helpers/utils";

const AddImageButton = ({ editorState, modifier, onChange }) => {
  const onClickButton = () => {
    document.getElementById("file-input").click();
  };

  const onFileChange = (event) => {
    if(!event.target.files.length) return;
    getBase64(event.target.files[0],(file)=>{
        onChange(modifier(editorState,file));
    })
  };

  return (
    <div>
      <input type="file" hidden id="file-input" onChange={onFileChange} />
      <button onClick={onClickButton} className="action-button"> Add Image</button>
    </div>
  );
};

export default AddImageButton;
