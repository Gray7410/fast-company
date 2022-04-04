import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ users }) => {
    const renderPhrase = (number) => {
        const lastOne = Number(number.toString().slice(-1));
        if (number > 4 && number < 15) return "человек тусанет";
        if ([2, 3, 4].indexOf(lastOne) >= 0) return "человека тусанут";
        if (lastOne === 1) return "человек тусанет";
        return "человек тусанет";
    };
    return (
        <h2>
            <span
                className={
                    "badge " + (users.length ? "bg-primary" : "bg-danger")
                }
            >
                {users.length
                    ? `${
                          users.length + " " + renderPhrase(users.length)
                      } с тобой сегодня`
                    : "Никто с тобой не тусанет"}
            </span>
        </h2>
    );
};
SearchStatus.propTypes = {
    users: PropTypes.array.isRequired
};

export default SearchStatus;
