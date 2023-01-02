import { EditorState, Modifier } from "draft-js";
import { readFiles } from '@draft-js-plugins/drag-n-drop-upload';


export const findWithRegex = (regex, block, callback) => {
  const text = block.getText();
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
};

export const createSpace = (contentState,selectionState) => {
  return Modifier.replaceText(
    contentState,
    selectionState.set("anchorOffset", selectionState.getStartOffset()),
    " "
  );
}


export default function mockUpload(data, success, failed, progress) {
  function doProgress(percent) {
    progress(percent || 1);
    if (percent === 100) {
      // Start reading the file
      Promise.all(data.files.map(readFiles)).then((files) =>
        success(files, { retainSrc: true })
      );
    } else {
      setTimeout(doProgress, 250, (percent || 0) + 10);
    }
  }

  doProgress();
}

export const getBase64 = (file,onSuccess) => {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () =>  {
    onSuccess(reader.result);
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}

export const addMyLink = (editorState,onChange) => {
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();
  const contentStateWithEntity = contentState.createEntity(
    "LINK",
    "MUTABLE",
    {
      url: "http://www.zombo.com",
    }
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newContentState = createSpace(contentState, selectionState);
  const contentStateWithLink = Modifier.insertText(
    newContentState,
    selectionState.set("anchorOffset", selectionState.getStartOffset()),
    "http://www.zombo.com",
    undefined,
    entityKey
  );
  const newEditorState = EditorState.push(
    editorState,
    contentStateWithLink,
    "apply-entity"
  );
  onChange(EditorState.moveFocusToEnd(newEditorState));
};

export const addMyName = (editorState,onChange) => {
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();
  const contentStateWithEntity = contentState.createEntity(
    "mention",
    "MUTABLE",
    "Shagun Sharma"
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newContentState = createSpace(contentState, selectionState);
  const contentStateWithName = Modifier.insertText(
    newContentState,
    selectionState,
    "@Shagun_Sharma",
    null,
    entityKey
  );
  const newEditorState = EditorState.push(
    editorState,
    contentStateWithName,
    "apply-entity"
  );
  onChange(EditorState.moveFocusToEnd(newEditorState));
};

