import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProfessionById } from "../../store/professions";

const Profession = ({ id }) => {
    const prof = useSelector(getProfessionById(id));
    if (prof) return <p>{prof.name}</p>;
    return "Loading...";
};
Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
