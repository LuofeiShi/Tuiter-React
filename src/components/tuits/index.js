/**
 * content of tuit
 */
import React from "react";
import './tuits.css';
import Tuit from "./tuit";
import * as likesService from "../../services/likes-service";
import * as dislikesService from "../../services/dislikes-service";
import * as service from "../../services/tuits-service";

/**
 * the content of tuit
 * @param tuits tuit bodys
 * @param refreshTuits refresh the stats and content of tuit
 * @returns {JSX.Element} tuit content
 * @constructor tuit constructor
 */
const Tuits = ({tuits = [], refreshTuits}) => {

    const likeTuit = (tuit) =>
        likesService
            .userTogglesTuitLikes("me", tuit._id)
            .then(refreshTuits)
            .catch(e => alert(e));

    const dislikeTuit = (tuit) =>
        dislikesService
            .userDislikesTuit('me', tuit._id)
            .then(refreshTuits)
            .catch(e => alert(e));

    const deleteTuit = (tid) =>
        service.deleteTuit(tid)
            .then(refreshTuits);

    return (
        <div>
          <ul className="ttr-tuits list-group">
            {
              tuits.map && tuits.map(tuit =>
                  <Tuit key={tuit._id}
                        deleteTuit={deleteTuit}
                        likeTuit={likeTuit}
                        dislikeTuit={dislikeTuit}
                        tuit={tuit}/>)
            }
          </ul>
        </div>
      );
}

export default Tuits;