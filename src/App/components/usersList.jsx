import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import PropTypes from "prop-types";
import { paginate } from "../utils/paginate";
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";
import UserTable from "./usersTable";
import _ from "lodash";

const UsersList = ({ users: allUsers, onDelete }) => {
    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState(api.professions.fetchAll());
    const [selectedProf, setSelectedProf] = useState();
    const [profLoading, setProfLoading] = useState(true);
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            setProfessions(data);
            setProfLoading(false);
        });
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };
    const handleSort = (item) => {
        setSortBy({ iter: item, order: "asc" });
    };

    const filteredUsers = selectedProf
        ? allUsers.filter((user) => user.profession._id === selectedProf._id)
        : allUsers;
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);
    useEffect(() => {
        if (!userCrop.length && count) {
            setCurrentPage((page) => page - 1);
        }
    }, [onDelete]);

    const clearFilter = () => {
        setSelectedProf();
    };

    return (
        <div className="d-flex">
            {professions && profLoading ? (
                <div className="alert alert-primary" role="alert">
                    Загрузка...
                </div>
            ) : (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                        onClickClear={clearFilter}
                    />
                </div>
            )}
            <div className="d-flex flex-column flex-grow-1 p-3">
                <SearchStatus users={count} selectedProf={selectedProf} />
                {count && (
                    <UserTable
                        users={userCrop}
                        onDelete={onDelete}
                        onSort={handleSort}
                    />
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};
UsersList.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default UsersList;
