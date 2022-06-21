import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import qualityService from "../services/quality.service";

const QualityContext = React.createContext();

export const useQualities = () => {
    return useContext(QualityContext);
};

export const QualityProvider = ({ children }) => {
    const [qualities, setQualities] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    function errorCatcher(error) {
        console.log(error);
        const { message } = error.response.data;
        setError(message);
    }
    const getQuality = (id) => {
        return qualities.find((q) => q._id === id);
    };

    useEffect(() => {
        const getQualities = async () => {
            try {
                const { content } = await qualityService.fetchAll();
                setQualities(content);
                setLoading(false);
            } catch (error) {
                errorCatcher(error);
            }
        };
        getQualities();
    }, []);

    return (
        <QualityContext.Provider
            value={{
                qualities,
                getQuality,
                isLoading
            }}
        >
            {!isLoading ? children : "Загрузка..."}
        </QualityContext.Provider>
    );
};

QualityProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
