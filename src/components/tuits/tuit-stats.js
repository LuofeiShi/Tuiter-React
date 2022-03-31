import React from "react";
import {useState, useEffect} from "react";
import * as likeService from "../../services/likes-service";
import * as dislikeService from "../../services/dislikes-service";

const TuitStats = ({tuit, likeTuit = () => {}, dislikeTuit = () => {}}) => {
    // the idea here is to decouple the like and dislike. make them atomic.
    const [isLikedByMe, setLikeTuit] = useState(false);
    const [dislikedByMe, setDislikeTuit] = useState(false);

    const isTuitLikedByMe = async () => {
        likeService.tuitLikedByMe('me', tuit._id)   // check if the current user like the tuit
            .then((like) => {                           // if like, then set the like flag to true
                setLikeTuit(like);
            })
        // const isLikeBool = await likeService.tuitLikedByMe("me", tuit._id);
        // setLikeTuit(isLikeBool);
    }
    const isTuitDislikedByMe = async () =>
        dislikeService.tuitDislikedByMe('me', tuit._id)
            .then((dislike) => {
                setDislikeTuit(dislike);
            })
    // use react effect to setup the methods
    useEffect(isTuitLikedByMe);
    useEffect(isTuitDislikedByMe);
    return (
      <div className="row mt-2">
        <div className="col">
          <i className="far fa-message me-1"/>
          {tuit.stats && tuit.stats.replies}
        </div>
        <div className="col">
          <i className="far fa-retweet me-1"/>
          {tuit.stats && tuit.stats.retuits}
        </div>
        <div className="col">
          <span onClick={() => likeTuit(tuit)}>
              {
                  tuit.stats && isLikedByMe &&
                  <i className="fa-solid fa-thumbs-up me-1" style={{color: 'gold'}}/>
              }
              {
                  tuit.stats && !isLikedByMe &&
                  <i className="fa-light fa-thumbs-up me-1"/>
              }
            {tuit.stats && tuit.stats.likes}
          </span>
        </div>
          <div className="col">
              <span onClick={() => dislikeTuit(tuit)} data-testid="dislike-button">
                    {
                        tuit.stats && dislikedByMe &&
                        <i className="fa-solid fa-thumbs-down me-1" style={{color: 'indianred'}}/>
                    }
                  {
                      tuit.stats && !dislikedByMe &&
                      <i className="fa-light fa-thumbs-down me-1"/>
                  }
                  {tuit.stats && tuit.stats.dislikes}
              </span>
          </div>
        <div className="col">
          <i className="far fa-inbox-out"/>
        </div>
      </div>
    );
}
export default TuitStats;