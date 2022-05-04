import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
    items,
    valueProperty,
    contentProperty,
    onItemSelect,
    selectedItem,
    onClickClear
}) => {
    return (
        <>
            <ul className="list-group">
                {Object.keys(items).map((item) => (
                    <li
                        key={items[item][valueProperty]}
                        className={
                            "list-group-item" +
                            (items[item] === selectedItem ? " active" : "")
                        }
                        onClick={() => onItemSelect(items[item])}
                        role="button"
                    >
                        {items[item][contentProperty]}
                    </li>
                ))}
            </ul>
            <button className="btn btn-secondary mt-2" onClick={onClickClear}>
                Очистить фильтр
            </button>
        </>
    );
};
GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};

GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    onItemSelect: PropTypes.func,
    selectedItem: PropTypes.object,
    onClickClear: PropTypes.func
};

export default GroupList;
