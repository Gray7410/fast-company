import React from "react";
import PropTypes from "prop-types";

const SearchField = ({ onChange, value }) => {
    return (
        <>
            <div className="form-floating mb-3 mt-3">
                <input
                    type="text"
                    className="form-control"
                    id="searchInput"
                    placeholder="Поиск"
                    value={value}
                    onChange={onChange}
                />
                <label htmlFor="searchInput">Поиск</label>
            </div>
        </>
    );
};

SearchField.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string
};

export default SearchField;
