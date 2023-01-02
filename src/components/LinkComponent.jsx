import React from "react";

export const linkStrategy = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "LINK"
    );
  }, callback);
};

const LinkComponent = ({ children, offsetKey }) => {
  return (
    <span className="link-comp" data-offset-key={offsetKey}>
      {children}
    </span>
  );
};

export default LinkComponent;
