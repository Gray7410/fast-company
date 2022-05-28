import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../../api";
import PropTypes from "prop-types";
import Qualities from "../../ui/qualities";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import Meetings from "../../ui/meetingsCard";

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
                                <h3 className="mb-4">Профиль пользователя</h3>
                                <p>
                                    <b>Имя: </b>
                                    {user.name}
                                </p>
                                <p>
                                    <b>E-mail: </b>
                                    {user.email}
                                </p>
                                <p>
                                    <b>Профессия: </b>
                                    {user.profession.name}
                                </p>
                                <p>
                                    <b>Пол : </b>
                                    {user.sex}
                                </p>
                                <p>
                                    <b>Качества: </b>
                                    <Qualities qualities={user.qualities} />
                                </p>

                                <Link
                                    key={userId}
                                    to={{
                                        pathname: `/users/${userId}/edit`
                                    }}
                                >
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary mt-2 w-100 mx-auto"
                                    >
                                        Редактировать профиль
                                    </button>
                                </Link>
                            </div>
                            <div className="col-md-8">
                                <Comments />
                            </div>
                        </>
                    ) : (
                        <div className="position-absolute top-50 start-50 translate-middle">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">
                                    Загрузка...
                                </span>
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
