import React, { useMemo } from "react";
import { Separator } from "@draft-js-plugins/static-toolbar";
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from "@draft-js-plugins/buttons";

const MyToolbar = ({ toolbarPlugin,linkPlugin ,textAlignmentPlugin}) => {
  if (!toolbarPlugin) return null;

  const { Toolbar } = toolbarPlugin;

  return (
    <div style={{ marginBottom: "20px" }}>
      <Toolbar>
        {(externalProps) => (
          <>
            <BoldButton {...externalProps} />
            <ItalicButton {...externalProps} />
            <UnderlineButton {...externalProps} />
            <CodeButton {...externalProps} />
            <Separator {...externalProps} />
            <textAlignmentPlugin.TextAlignment {...externalProps} />
            <Separator {...externalProps} />
            <UnorderedListButton {...externalProps} />
            <OrderedListButton {...externalProps} />
            <BlockquoteButton {...externalProps} />
            <CodeBlockButton {...externalProps} />
            <linkPlugin.LinkButton {...externalProps} />
          </>
        )}
      </Toolbar>
    </div>
  );
};

export default MyToolbar;
