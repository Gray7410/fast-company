import React, { useEffect, useState } from "react";
import UsersList from "./components/usersList";
import api from "./api";

function App() {
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
    console.log(users === []);
    return (
        <>
            {loader ? (
                <div className="alert alert-primary" role="alert">
                    Загрузка...
                </div>
            ) : (
                <UsersList onDelete={handleDelete} users={users} />
            )}
        </>
    );
}

export default App;
