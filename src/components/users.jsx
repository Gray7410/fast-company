import React from "react";
import api from "../api";

const renderUser = () => {
  return api.users.fetchAll().map((user) => (
    <tr id={user._id}>
      <td>{user.name}</td>
      <td>{renderQualities(user.qualities)}</td>
      <td>{user.profession.name}</td>
      <td>{user.completedMeetings}</td>
      <td>{user.rate}/5</td>
      <td>
        <button className="btn btn-danger">delete</button>
      </td>
    </tr>
  ));
};

const renderQualities = (qualities) => {
  return qualities.map((quality) => (
    <span className={getBadgeClasses(quality)} id={quality._id}>
      {quality.name}
    </span>
  ));
};

const getBadgeClasses = (quality) => {
  let classes = "badge m-2 bg-";
  classes += quality.color;
  return classes;
};

const renderTitle = () => {
  return <span className="badge bg-primary">Users</span>;
};

const Users = () => {
  return (
    <>
      <h2>{renderTitle()}</h2>
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
    </>
  );
};

export default Users;
