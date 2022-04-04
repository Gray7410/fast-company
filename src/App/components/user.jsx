import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";

const User = (props) => {
  const {
    _id: id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    onDelete,
  } = props;
  return (
    <tr key={id}>
      <td>{name}</td>
      <td>{Qualitie(qualities)}</td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}/5</td>
      <td>
        <BookMark />
      </td>
      <td>
        {
          <button
            className="btn btn-danger"
            key={id}
            onClick={() => onDelete(id)}
          >
            Удалить
          </button>
        }
      </td>
    </tr>
  );
};

export default User;
