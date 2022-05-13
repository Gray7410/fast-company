import React, { useState, useEffect } from "react";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import api from "../../../api";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/usersTable";
import _ from "lodash";
import SearchField from "../../searchField";

const UsersListPage = () => {
    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState(api.professions.fetchAll());
    const [selectedProf, setSelectedProf] = useState();
    const [profLoading, setProfLoading] = useState(true);
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [users, setUsers] = useState([]);
    const [loader, setLoader] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        api.users.fetchAll().then((users) => {
            setUsers(users);
            setLoader(false);
        });
    }, []);

    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark };
                }
                return user;
            })
        );
    };

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
        setSearch("");
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    const filteredUsers = selectedProf
        ? users.filter((user) => user.profession._id === selectedProf._id)
        : users.filter((user) =>
              user.name.toLowerCase().includes(search.toLowerCase())
          );
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

    const handleSearch = ({ target }) => {
        setSearch(target.value);
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
                        <SearchField value={search} onChange={handleSearch} />
                        {count > 0 && (
                            <UserTable
                                users={userCrop}
                                onDelete={handleDelete}
                                onToggleBookMark={handleToggleBookMark}
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

export default UsersListPage;
