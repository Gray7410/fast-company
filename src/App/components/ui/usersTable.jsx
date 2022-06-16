import React from "react";
import PropTypes from "prop-types";
import BookMark from "../common/bookmark";
import Table from "../common/table";
import Profession from "./profession";
import Quality from "./quality";

const UserTable = ({ users, selectedSort, onSort, onToggleBookMark }) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: {
            name: "Качетва",
            component: (user) => <Quality id={user.qualities} />
        },
        professions: {
            name: "Профессия",
            component: (user) => <Profession id={user.profession} />
        },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <BookMark
                    status={user.bookmark}
                    onClick={() => onToggleBookMark(user._id)}
                />
            )
        }
    };
    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        />
    );
};

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired
};

export default UserTable;
