import React from "react";

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

export default Qualitie;
