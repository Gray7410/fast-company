import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import NavProfile from "./navProfile";

const NavBar = () => {
    const { currentUser } = useAuth();
    return (
        <nav className="navbar bg-secondary mb-3">
            <div className="container-fluid">
                <ul className="nav">
                    <li className="nav-item">
                        <Link className="nav-link text-light" to="/">
                            Главная
                        </Link>
                    </li>
                    {currentUser && (
                        <li className="nav-item">
                            <Link className="nav-link text-light" to="/users">
                                Пользователи
                            </Link>
                        </li>
                    )}
                </ul>
                <div className="d-flex">
                    {currentUser ? (
                        <NavProfile />
                    ) : (
                        <Link className="nav-link text-light" to="/login">
                            Авторизация
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
