import React from "react";
import PropTypes from "prop-types";

const Qualitie = (qualities) => {
    const getBadgeClasses = (quality) => {
        let classes = "badge m-2 bg-";
        classes += quality.color;
        return classes;
    };
    return qualities.map((quality) => (
        <span className={getBadgeClasses(quality)} key={quality._id}>
            {quality.name}
        </span>
    ));
};
Qualitie.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default Qualitie;
