import React from "react";
import UserPage from "../components/page/userPage/userPage";
import UsersListPage from "../components/page/usersListPage/usersListPage";
import { useParams } from "react-router-dom";
import { users } from "../api/fake.api/user.api";
import UserProvider from "../hooks/useUsers";

const Users = () => {
    const params = useParams();
    const { userId } = params;
    return (
        <UserProvider>
            {userId ? (
                <UserPage userId={userId} />
            ) : (
                <UsersListPage users={users} />
            )}
        </UserProvider>
    );
};

export default Users;
