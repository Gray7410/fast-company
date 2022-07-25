import React from "react";
import useMockData from "../utils/mockData";

const Main = () => {
    const { error, initialize, progress, status } = useMockData();
    const handleClick = () => {
        initialize();
    };
    const widthProgress = { width: `${progress}%` };
    return (
        <div className="container mt-5">
            <h1>Главная</h1>
            <div className="card p-3 mt-5">
                <h3>Инициализация данных в FireBase</h3>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">Статус - {status}</li>
                    <li className="list-group-item m-2">
                        <div className="progress">
                            <div
                                className={
                                    progress !== 100
                                        ? "progress-bar bg-warning"
                                        : "progress-bar bg-success"
                                }
                                role="progressbar"
                                style={widthProgress}
                                aria-valuenow={progress}
                                aria-valuemin="0"
                                aria-valuemax="100"
                            >
                                {progress}%
                            </div>
                        </div>
                    </li>
                    {error && (
                        <li className="list-group-item">Ошибка - {error}</li>
                    )}
                </ul>
                <button
                    className="btn btn-outline-secondary mt-3"
                    onClick={handleClick}
                >
                    Инициализировать
                </button>
            </div>
        </div>
    );
};

export default Main;
