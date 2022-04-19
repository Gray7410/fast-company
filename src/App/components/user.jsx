import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";
import PropTypes from "prop-types";

const User = (props) => {
    const {
        _id: id,
        name,
        qualities,
        profession,
        completedMeetings,
        rate,
        onDelete
    } = props;
    return (
        <tr key={id}>
            <td>{name}</td>
            <td>{Qualitie(qualities)}</td>
            <td>{profession.name}</td>
            <td>{completedMeetings}</td>
            <td>{rate}/5</td>
            <td>
                <BookMark />
            </td>
            <td>
                {
                    <button
                        className="btn btn-danger"
                        key={id}
                        onClick={() => onDelete(id)}
                    >
                        Удалить
                    </button>
                }
            </td>
        </tr>
    );
};
User.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array.isRequired,
    profession: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default User;
