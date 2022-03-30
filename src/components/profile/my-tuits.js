import {useEffect, useState} from "react";
import * as service from "../../services/tuits-service";
import Tuits from "../tuits";

const MyTuits = () => {                                   // render tuits by currently logged in user
    const [tuits, setTuits] = useState([]);     // state variable holding my tuits
    const findMyTuits = () =>                             // function to retrieve my tuits
        service.findTuitByUser("me")                 // from RESTful API
            .then(tuits => setTuits(tuits));             // and update local state
    useEffect(findMyTuits, []);                    // on load invoke findMyTuits
    const deleteTuit = (tid) =>                         // handle deleteTuit event from Tuit component
        service.deleteTuit(tid)                          // invokes deleteTuit RESTful API
            .then(findMyTuits);                         // and then retrieves all my tuits again
    return(
        <Tuits tuits={tuits}                            // render my tuits and pass
               refreshTuits={findMyTuits}/>             // deleteTuit even handler to delete tuit
    );
};

export default MyTuits;