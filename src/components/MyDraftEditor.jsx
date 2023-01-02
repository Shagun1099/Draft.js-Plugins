import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  CompositeDecorator,
  convertFromRaw,
  convertToRaw,
  EditorState,
  Modifier,
} from "draft-js";
import Editor, {
  composeDecorators,
  createEditorStateWithText,
} from "@draft-js-plugins/editor";
import NameComponent, { nameStrategy, mentions } from "./NameComponent";
import LinkComponent, { linkStrategy } from "./LinkComponent";
import createToolbarPlugin from "@draft-js-plugins/static-toolbar";
import mockUpload, {
  addMyLink,
  addMyName,
  getBase64,
} from "../helpers/utils";
import createEmojiPlugin from "@draft-js-plugins/emoji";
import "@draft-js-plugins/emoji/lib/plugin.css";
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from "draft-js-mention-plugin";
import MyToolbar from "./MyToolbar";
import createImagePlugin from "@draft-js-plugins/image";
import createAlignmentPlugin from "@draft-js-plugins/alignment";
import createFocusPlugin from "@draft-js-plugins/focus";
import createResizeablePlugin from "@draft-js-plugins/resizeable";
import createBlockDndPlugin from "@draft-js-plugins/drag-n-drop";
import createDragNDropUploadPlugin from "@draft-js-plugins/drag-n-drop-upload";
import AddImageButton from "./AddImageButton";
import createHashtagPlugin from "@draft-js-plugins/hashtag";
import createUndoPlugin from "@draft-js-plugins/undo";
import createLinkPlugin from "@draft-js-plugins/anchor";
import createLinkifyPlugin from "@draft-js-plugins/linkify";
import createTextAlignmentPlugin from "@draft-js-plugins/text-alignment";
import styles from "../helpers/styles.module.css";
import MyNote from "./MyNote";

export const undoPlugin = createUndoPlugin({
  theme: {
    undo: styles.undo,
    redo: styles.redo,
  },
});
export const linkPlugin = createLinkPlugin({
  theme: {
    link: styles.hashtag,
    input: styles.input,
  },
});
export const linkifyPlugin = createLinkifyPlugin({
  theme: {
    link: styles.hashtag,
  },
});
export const hashtagPlugin = createHashtagPlugin({ theme: styles });
export const textAlignmentPlugin = createTextAlignmentPlugin();
export const focusPlugin = createFocusPlugin();
export const resizeablePlugin = createResizeablePlugin();
export const blockDndPlugin = createBlockDndPlugin();
export const alignmentPlugin = createAlignmentPlugin();
const { AlignmentTool } = alignmentPlugin;

const { UndoButton, RedoButton } = undoPlugin;

const decorator = composeDecorators(
  resizeablePlugin.decorator,
  alignmentPlugin.decorator,
  focusPlugin.decorator,
  blockDndPlugin.decorator
);
export const imagePlugin = createImagePlugin({ decorator });

export const dragNDropFileUploadPlugin = createDragNDropUploadPlugin({
  handleUpload: mockUpload,
  addImage: imagePlugin.addImage,
});

export const decorators = [
  {
    strategy: nameStrategy,
    component: NameComponent,
  },
  {
    strategy: linkStrategy,
    component: LinkComponent,
  },
];

const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

const MyDraftEditor = () => {
  const [editorState, setEditorState] = useState(
    () => createEditorStateWithText(" "),
    []
  );
  const [editMode, setEditMode] = useState(false);
  const [userSuggestions, setUserSuggestions] = useState(mentions);
  const [savedNotes, setSavedNotes] = useState([]);
  const editor = useRef(null);

  const [toolbarPlugin] = useMemo(() => {
    const staticToolbarPlugin = createToolbarPlugin();
    return [staticToolbarPlugin];
  }, []);

  const mentionPlugin = useMemo(
    () =>
      createMentionPlugin({
        entityMutability: "IMMUTABLE",
        mentionPrefix: "@",
        supportWhitespace: true,
      }),
    []
  );

  const { MentionSuggestions } = useMemo(() => mentionPlugin, [mentionPlugin]);

  const handleAddMyName = () => {
    addMyName(editorState, onChange);
  };

  const handleAddMyLink = () => {
    addMyLink(editorState, onChange);
  };

  const onSearchChange = ({ value }) => {
    if (!value) return;
    setUserSuggestions(defaultSuggestionsFilter(value, userSuggestions));
  };

  const onChange = useCallback((newState) => {
    setEditorState(newState);
  }, []);

  const addImageToEditor = (file) => {
    getBase64(file, (f) => {
      onChange(imagePlugin.addImage(editorState, f));
    });
  };

  const handleDrop = (data) => {
    console.log(data);
  };

  const handlePasteFiles = (files) => {
    files.forEach((file) => {
      addImageToEditor(file);
    });
  };

  const saveMyNote = () => {
    const conentState = editorState.getCurrentContent();
    const data = convertToRaw(conentState);
    let newNotes = savedNotes;
    if (typeof editMode === "number") {
      newNotes[editMode] = { content: data, timestamp: new Date() };
    } else {
      newNotes.push({ content: data, timestamp: new Date() });
    }

    setSavedNotes([...newNotes]);
    setEditMode(false);
    onChange(createEditorStateWithText(" "));
  };

  const handleSetEditNote = (index) => {
    setEditMode(index);
    const { content } = savedNotes[index];
    const contentState = convertFromRaw(content);
    const eState = EditorState.createWithContent(contentState);
    onChange(eState);
  };

  return (
    <div>
      <div className="editor">
        <MyToolbar
          toolbarPlugin={toolbarPlugin}
          linkPlugin={linkPlugin}
          textAlignmentPlugin={textAlignmentPlugin}
        />
        <Editor
          ref={editor}
          editorState={editorState}
          onChange={onChange}
          plugins={[
            mentionPlugin,
            toolbarPlugin,
            emojiPlugin,
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
          readOnly={false}
          handleDrop={handleDrop}
          handleDroppedFiles={handleDrop}
          handlePastedFiles={handlePasteFiles}
        />
        <MentionSuggestions
          suggestions={userSuggestions}
          onSearchChange={onSearchChange}
        />
        <AlignmentTool />
      </div>
      <div className="action-container">
        <EmojiSelect />
        <EmojiSuggestions />
        <div>
          <UndoButton />
          <RedoButton />
        </div>
        <button onClick={handleAddMyName} className="action-button">
          Add My Name
        </button>
        <button onClick={handleAddMyLink} className="action-button">
          Add My Link
        </button>
        <AddImageButton
          editorState={editorState}
          modifier={imagePlugin.addImage}
          onChange={onChange}
        />
        <button className="action-button" onClick={saveMyNote}>
          Save my Note
        </button>
      </div>
      <div>
        {savedNotes.map((data, i) => (
          <MyNote data={data} key={i} onEdit={handleSetEditNote} index={i} />
        ))}
      </div>
    </div>
  );
};

export default MyDraftEditor;
