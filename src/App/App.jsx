import React, { useState } from "react";
import UsersList from "./components/usersList";
import SearchStatus from "./components/searchStatus";
import api from "./api";

function App() {
    const [users, setUsers] = useState(api.users.fetchAll());

    const handleDelete = (id) => {
        setUsers(users.filter((user) => user._id !== id));
    };

    return (
        <>
            <SearchStatus users={users} />
            <UsersList onDelete={handleDelete} users={users} />
        </>
    );
}

export default App;
