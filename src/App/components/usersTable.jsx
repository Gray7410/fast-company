import React from "react";
import PropTypes from "prop-types";
import User from "./user";
import TableHeader from "./tableHeader";

const UserTable = ({ users, onDelete, selectedSort, onSort }) => {
    const columns = {
        name: { iter: "name", name: "Имя" },
        qualities: { name: "Качетва" },
        professions: { iter: "profession.name", name: "Профессия" },
        completedMeetings: {
            iter: "completedMeetings",
            name: "Встретился раз"
        },
        rate: { iter: "rate", name: "Оценка" },
        bookmark: { iter: "bookmark", name: "Избранное" },
        delete: {}
    };
    return (
        <table className="table">
            <TableHeader {...{ onSort, selectedSort, columns }} />
            <tbody>
                {users.map((user) => (
                    <User key={user._id} onDelete={onDelete} {...user} />
                ))}
            </tbody>
        </table>
    );
};

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired
};

export default UserTable;
