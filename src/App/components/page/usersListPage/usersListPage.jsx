import React, { useState, useEffect } from "react";
import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/usersTable";
import _ from "lodash";
import SearchField from "../../searchField";
import { useSelector } from "react-redux";
import { getProfessions } from "../../../store/professions";
import { getCurrentUserId, getUsersList } from "../../../store/users";

const UsersListPage = () => {
    const pageSize = 8;
    const professions = useSelector(getProfessions());
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [search, setSearch] = useState("");

    const users = useSelector(getUsersList());
    const currentUserId = useSelector(getCurrentUserId());

    const handleToggleBookMark = (id) => {
        console.log(id);
    };

    const handleDelete = (id) => {
        console.log(id);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

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

    function filterUsers(data) {
        const filteredUsers = selectedProf
            ? data.filter((user) => user.profession._id === selectedProf._id)
            : data.filter((user) =>
                  user.name.toLowerCase().includes(search.toLowerCase())
              );
        return filteredUsers.filter((u) => u._id !== currentUserId);
    }
    const filteredUsers = filterUsers(users);
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
            <div className="d-flex">
                {!professions ? (
                    <div
                        className="spinner-border text-secondary"
                        role="status"
                    >
                        <span className="visually-hidden">Загрузка...</span>
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
        </>
    );
};

export default UsersListPage;
