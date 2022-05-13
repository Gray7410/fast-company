import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ users, selectedProf }) => {
    const renderPhrase = (number) => {
        const lastOne = Number(number.toString().slice(-1));
        if (number > 4 && number < 15) return "человек тусанет";
        if ([2, 3, 4].indexOf(lastOne) >= 0) return "человека тусанут";
        if (lastOne === 1) return "человек тусанет";
        return "человек тусанет";
    };
    return (
        <h2>
            <span className={"badge " + (users ? "bg-primary" : "bg-danger")}>
                {users
                    ? `${users + " " + renderPhrase(users)} с тобой сегодня`
                    : selectedProf
                    ? "Никто из этой категории с тобой не тусанет"
                    : "Никто с тобой не тусанет"}
            </span>
        </h2>
    );
};
SearchStatus.propTypes = {
    users: PropTypes.number.isRequired,
    selectedProf: PropTypes.object
};

export default SearchStatus;
