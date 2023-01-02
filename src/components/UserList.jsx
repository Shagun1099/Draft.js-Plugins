import React from "react";
import { mentions } from "./NameComponent";

const UserList = () => {
  return (
    <div className="userList">
        <h3>YOU CAN TAG THESE USER BY TYPING `@`</h3>
      {mentions.map(({ name, link, avatar }, i) => (
        <div className="user" key={i}>
          <img src={avatar} />
          <div>
            <h3>{name}</h3>
            <p>{link}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
