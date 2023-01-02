import React, { memo, useCallback, useMemo } from "react";
import Editor from "@draft-js-plugins/editor";
import { CompositeDecorator, convertFromRaw, EditorState } from "draft-js";
import {
  decorators,
  imagePlugin,
  dragNDropFileUploadPlugin,
  blockDndPlugin,
  focusPlugin,
  alignmentPlugin,
  resizeablePlugin,
  hashtagPlugin,
  undoPlugin,
  linkPlugin,
  linkifyPlugin,
  textAlignmentPlugin,
} from "./MyDraftEditor";
import createMentionPlugin from "draft-js-mention-plugin";

const MyNote = ({ data, onEdit, index }) => {
  const { content, timestamp } = data;
  const contentState = convertFromRaw(content);
  const editorState = EditorState.createWithContent(
    contentState,
    new CompositeDecorator(decorators)
  );
  const mentionPlugin = useMemo(
    () =>
      createMentionPlugin({
        entityMutability: "IMMUTABLE",
        mentionPrefix: "@",
        supportWhitespace: true,
      }),
    []
  );

  const handleEdit = useCallback(() => {
    onEdit(index);
  },[]);

  return (
    <div className="note">
      <div draggable className="timestamp">{timestamp.toDateString()}</div>
      <Editor
        editorState={editorState}
        readOnly
        plugins={[
          mentionPlugin,
          imagePlugin,
          dragNDropFileUploadPlugin,
          blockDndPlugin,
          focusPlugin,
          alignmentPlugin,
          resizeablePlugin,
          hashtagPlugin,
          undoPlugin,
          linkPlugin,
          linkifyPlugin,
          textAlignmentPlugin,
        ]}
        decorators={decorators}
      />
      <img
        onClick={handleEdit}
        src="https://cdn-icons-png.flaticon.com/512/126/126794.png"
        className="edit-icon"
        height="25px"
      />
    </div>
  );
};

export default memo(MyNote);
