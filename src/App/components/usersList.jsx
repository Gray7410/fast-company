import React, { useState, useEffect } from "react";
import Pagination from "./pagination";
import PropTypes from "prop-types";
import { paginate } from "../utils/paginate";
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";
import UserTable from "./usersTable";
import _ from "lodash";

const UsersList = () => {
    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState(api.professions.fetchAll());
    const [selectedProf, setSelectedProf] = useState();
    const [profLoading, setProfLoading] = useState(true);
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });

    const [users, setUsers] = useState([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        api.users.fetchAll().then((users) => {
            setUsers(users);
            setLoader(false);
        });
    }, []);

    const handleDelete = (id) => {
        setUsers(users.filter((user) => user._id !== id));
    };

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
        setSortBy(item);
    };

    const filteredUsers = selectedProf
        ? users.filter((user) => user.profession._id === selectedProf._id)
        : users;
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const userCrop = paginate(sortedUsers, currentPage, pageSize);
    useEffect(() => {
        if (!userCrop.length && count) {
            setCurrentPage((page) => page - 1);
        }
    }, [handleDelete]);

    const clearFilter = () => {
        setSelectedProf();
    };

    return (
        <>
            {loader ? (
                <div className="alert alert-primary" role="alert">
                    Загрузка...
                </div>
            ) : (
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
                        <SearchStatus
                            users={count}
                            selectedProf={selectedProf}
                        />
                        {count && (
                            <UserTable
                                users={userCrop}
                                onDelete={handleDelete}
                                onSort={handleSort}
                                selectedSort={sortBy}
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
            )}
        </>
    );
};
UsersList.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default UsersList;
