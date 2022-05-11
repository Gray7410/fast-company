import React from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import Qualities from "../../ui/qualities";

const User = ({ users, id }) => {
    const history = useHistory();
    const getById = (id) => users.find((user) => user._id === id);
    const handleUsers = () => {
        history.push("/users");
    };
    const user = getById(id);
    return (
        <>
            {user ? (
                <>
                    <h2>{user.name}</h2>
                    <h3>Профессия: {user.profession.name}</h3>
                    <Qualities qualities={user.qualities} />
                    <p>Встретился {user.completedMeetings} раз</p>
                    <h4>Оценка - {user.rate} / 5</h4>
                    <button onClick={() => handleUsers()}>
                        Все пользователи
                    </button>
                </>
            ) : (
                <div className="alert alert-primary" role="alert">
                    Загрузка...
                </div>
            )}
        </>
    );
};

User.propTypes = {
    users: PropTypes.array,
    id: PropTypes.string
};

export default User;
