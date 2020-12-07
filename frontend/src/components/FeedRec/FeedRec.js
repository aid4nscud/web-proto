import React from "react";
import "./FeedRec.css";

export const FeedRec = (props) => {
  let uri = props.uri;
  let uriCode = uri.substr(14);

  let url = "https://open.spotify.com/embed/track/" + uriCode;

  return (
    <div className="container">
      <div className="feed-rec">
        <div className="card-header">
          <div className="user-info">
            <h3 className="rec-desc">
              Recommended by{" "}
              <span className="span-recommender">{props.user}</span>
            </h3>
            {props.followButton === "Following" ? (
              <button
                className="unfollow-button"
                onClick={() => {
                  props.unfollow(props.user);
                }}
              >
                {props.followButton}
              </button>
            ) : (
              <button className="follow-button">{props.followButton}</button>
            )}
          </div>
          <div className="rec-info">
            <h3 className="likes-label">{"Likes: " + props.likes}</h3>
            <button
              className="like-button"
              onClick={() => {
                props.like(props.id);
              }}
            >
              Like
            </button>
          </div>
        </div>
        <iframe
          className="feed-rec-iframe"
          src={url}
          width="500"
          height="500"
          frameBorder="1"
          allowtransparency="true"
          allow="encrypted-media"
        ></iframe>
      </div>
      <div className="next-button-container">
        <button className="next-button" onClick={props.nextRec}>
          Next
        </button>
      </div>
    </div>
  );
};
