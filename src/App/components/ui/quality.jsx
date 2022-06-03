import React from "react";
import { useQualities } from "../../hooks/useQualities";
import PropTypes from "prop-types";
import Qualities from "./qualities/qualitiesList";

const Quality = ({ id }) => {
    const { isLoading, getQuality } = useQualities();
    const qual = id.map((qualId) => {
        return getQuality(qualId);
    });
    if (!isLoading) {
        return <Qualities qualities={qual} />;
    } else return "Loading...";
};
Quality.propTypes = {
    id: PropTypes.array
};
export default Quality;
