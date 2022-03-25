import React, { useState } from "react";
import api from "../api";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const [count, setCount] = useState(users.length);

  const handleDelete = (id) => {
    userDecrement();
    setUsers((prevState) => prevState.filter((user) => user._id !== id));
  };

  const userDecrement = () => {
    setCount((prevState) => prevState - 1);
  };

  const renderUser = () => {
    return users.map((user) => (
      <tr key={user._id}>
        <td>{user.name}</td>
        <td>{renderQualities(user.qualities)}</td>
        <td>{user.profession.name}</td>
        <td>{user.completedMeetings}</td>
        <td>{user.rate}/5</td>
        <td>
          <button
            className="btn btn-danger"
            key={user._id}
            onClick={() => handleDelete(user._id)}
          >
            delete
          </button>
        </td>
      </tr>
    ));
  };

  const renderQualities = (qualities) => {
    return qualities.map((quality) => (
      <span className={getBadgeClasses(quality)} key={quality._id}>
        {quality.name}
      </span>
    ));
  };

  const getBadgeClasses = (quality) => {
    let classes = "badge m-2 bg-";
    classes += quality.color;
    return classes;
  };

  const rednerPhrase = (number) => {
    if (number > 4 || number === 1)
      return number + " человек тусанет с тобой сегодня";
    if (number < 5 && number > 1)
      return number + " человека тусанут с тобой сегодня";
  };

  const renderTable = () => {
    return count ? (
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{renderUser()}</tbody>
      </table>
    ) : (
      <h2>
        <span className="badge bg-danger">Никто с тобой не тусанет</span>
      </h2>
    );
  };

  return (
    <>
      <h2>
        <span className="badge bg-primary">{rednerPhrase(count)}</span>
      </h2>
      {renderTable()}
    </>
  );
};

export default Users;
