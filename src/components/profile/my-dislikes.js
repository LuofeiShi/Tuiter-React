import {useEffect, useState} from "react";
import Tuits from "../tuits";
import * as service from "../../services/dislikes-service"

const MyDislikes = () => {
    const [dislikedTuits, setDislikedTuits] = useState([]);
    const findTuitsDislike = () =>
        service
            .tuitDislikedByUser('me')
            .then((tuits) =>
                setDislikedTuits(tuits));
    useEffect(findTuitsDislike, []);

    return (
        <div>
            <Tuits tuits={dislikedTuits} refreshTuits={findTuitsDislike}/>
        </div>
    );
};

export default MyDislikes;
