import React from "react";
import UserPage from "../components/page/userPage/userPage";
import UsersListPage from "../components/page/usersListPage/usersListPage";
import { useParams } from "react-router-dom";
import { users } from "../api/fake.api/user.api";

const Users = () => {
    const params = useParams();
    const { userId } = params;
    return (
        <>
            {userId ? (
                <UserPage userId={userId} />
            ) : (
                <UsersListPage users={users} />
            )}
        </>
    );
};

export default Users;
