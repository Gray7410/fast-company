import React from "react";
import { useQualities } from "../../hooks/useQualities";
import PropTypes from "prop-types";
import Qualities from "./qualities/qualitiesList";

const Quality = ({ id }) => {
    const { isLoading, getQuality } = useQualities();
    const qual = id.map((qualId) => {
        return getQuality(qualId);
    });
    if (!isLoading) return <Qualities qualities={qual} />;
    return (
        <div className="col-md-4 mb-3">
            <div className="position-absolute top-50 start-50 translate-middle">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Загрузка...</span>
                </div>
            </div>
        </div>
    );
};
Quality.propTypes = {
    id: PropTypes.array
};
export default Quality;
