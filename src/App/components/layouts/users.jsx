import React from "react";
import User from "../user";
import UsersList from "../usersList";
import { useParams } from "react-router-dom";
import { users } from "../../api/fake.api/user.api";

const Users = () => {
    const params = useParams();
    const { userId } = params;
    return (
        <>
            {userId ? (
                <User id={userId} users={users} />
            ) : (
                <UsersList users={users} />
            )}
        </>
    );
};

export default Users;
