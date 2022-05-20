import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import api from "../../../api";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radioField";
import MultiSelectField from "../../common/form/multiSelectField";
import PropTypes from "prop-types";

const EditUserPage = () => {
    const history = useHistory();
    const { userId } = useParams();
    const [user, setUser] = useState();
    const [data, setData] = useState({});
    const [qualities, setQualities] = useState([]);
    const [errors, setErrors] = useState({});
    const [professions, setProfessions] = useState([]);
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }));
            setProfessions(professionsList);
        });
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }));
            setQualities(qualitiesList);
        });
        api.users.getById(userId).then((data) => {
            setUser(data);
            setLoader(false);
        });
    }, []);

    useEffect(() => {
        if (user) {
            const userQualities = Object.keys(user.qualities).map(
                (quality) => ({
                    value: user.qualities[quality]._id,
                    label: user.qualities[quality].name,
                    color: user.qualities[quality].color
                })
            );
            setData({
                ...user,
                profession: user.profession._id,
                qualities: userQualities
            });
        }
    }, [user]);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfig = {
        email: {
            isRequired: {
                message: `Электронная почта обязательна для заполнения`
            },
            isEmail: {
                message: `Email введен не корректно`
            }
        },
        password: {
            isRequired: {
                message: `Пароль обязателен для заполнения`
            },
            isCapitalSymbol: {
                message: `Пароль должен содержать хотя бы одну заглавную букву`
            },
            isContainDigit: {
                message: `Пароль должен содержать хотя бы одно число`
            },
            min: {
                message: `Пароль должен состоять минимум из 8 символов`,
                value: 8
            }
        },
        profession: {
            isRequired: {
                message: `Указание профессии обязательно`
            }
        },
        license: {
            isRequired: {
                message: `Подтверждение лицензионного соглашения обязательно`
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label };
            }
        }
    };
    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    });
                }
            }
        }
        return qualitiesArray;
    };

    const goBackUserPage = () => {
        history.replace(`/users/${userId}/`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const { profession, qualities } = data;
        api.users.update(userId, {
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        });
        goBackUserPage();
    };
    return (
        <>
            {loader ? (
                <div className="position-absolute top-50 start-50 translate-middle">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Загрузка...</span>
                    </div>
                </div>
            ) : (
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-6 offset-md-3 p-4">
                            <h3 className="mb-4">Редактирование профиля</h3>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Имя"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                <TextField
                                    label="Почта"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />
                                <SelectField
                                    label="Профессия"
                                    defaultOption="Выберите профессию"
                                    name="profession"
                                    options={professions}
                                    onChange={handleChange}
                                    value={data.profession}
                                    error={errors.profession}
                                />
                                <RadioField
                                    options={[
                                        { name: "Мужской", value: "male" },
                                        { name: "Женский", value: "female" },
                                        { name: "Другой", value: "other" }
                                    ]}
                                    value={data.sex}
                                    name="sex"
                                    onChange={handleChange}
                                    label="Пол"
                                />
                                <MultiSelectField
                                    options={qualities}
                                    onChange={handleChange}
                                    defaultValue={data.qualities}
                                    name="qualities"
                                    label="Качества"
                                />
                                <button
                                    disabled={!isValid}
                                    className="btn btn-outline-success w-100 mx-auto"
                                >
                                    Сохранить
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

EditUserPage.propTypes = {
    user: PropTypes.string
};

export default EditUserPage;
