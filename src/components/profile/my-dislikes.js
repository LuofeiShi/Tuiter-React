import {useEffect, useState} from "react";
import Tuits from "../tuits";
import * as service from "../../services/dislikes-service"

const MyDislikes = () => {
    const [dislikedTuits, setDislikedTuits] = useState([]);
    const findTuitsIDislike = async () =>
        await service.findAllTuitsDislikedByUser("me")
            .then((tuits) =>
                setDislikedTuits(tuits));
    useEffect(findTuitsIDislike, []);

    return (
        <div>
            <Tuits tuits={dislikedTuits}
                   refreshTuits={findTuitsIDislike}/>
        </div>
    );
};

export default MyDislikes;
