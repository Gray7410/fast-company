import React, { useEffect, useState } from "react";
import api from "../../../api";
import PropTypes from "prop-types";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import Meetings from "../../ui/meetingsCard";
import Comments from "../../ui/comments";

const User = ({ userId }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);
    return (
        <>
            <div className="container mt-5">
                <div className="row gutters-sm">
                    {user ? (
                        <>
                            <div className="col-md-4 mb-3">
                                <UserCard user={user} />
                                <QualitiesCard data={user.qualities} />
                                <Meetings value={user.completedMeetings} />
                            </div>
                            <div className="col-md-8">
                                <Comments />
                            </div>
                        </>
                    ) : (
                        <div className="col-md-4 mb-3">
                            <div className="position-absolute top-50 start-50 translate-middle">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">
                                        Загрузка...
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

User.propTypes = {
    userId: PropTypes.string
};

export default User;
