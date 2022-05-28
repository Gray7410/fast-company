import React, { useEffect, useState } from "react";
import { orderBy } from "lodash";
import API from "../../api";
import { useParams } from "react-router-dom";

const Comments = () => {
    const { userId } = useParams();
    const [comments, setComments] = useState([]);
    useEffect(() => {
        API.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    }, []);
    return null;
};

export default Comments;
