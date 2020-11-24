import React, { useEffect, useState } from "react";
import { getCookie } from "../../utils/auth";
import { UserRec } from "../UserRec/UserRec";
import "./Profile.css";

export const Profile = (props) => {
  const [userRecs, setUserRecs] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (user === null) {
      let query = getCookie("user");

      const url = "/get_user_recs/" + query;
      fetch(url)
        .then((res) => res.json())
        .then((parsedJSON) => {
          if (parsedJSON["recs"].length > 0) {
            setUserRecs(parsedJSON["recs"]);
          }
          setUser(query);
        });
    } else {
      const url = "/get_user_recs/" + user;
      fetch(url)
        .then((res) => res.json())
        .then((parsedJSON) => {
          if (parsedJSON["recs"].length > 0) {
            setUserRecs(parsedJSON["recs"]);
          }
        });
    }
  }, []);

  return (
    <div>
      {user !== null && (
        <h1>
          Welcome to your profile <span className="span-user">{user}</span>
        </h1>
      )}

      {userRecs !== null ? (
        <h2>Songs You've Recommended</h2>
      ) : (
        <h2>Once you make a recommendation, find it here!</h2>
      )}

      {userRecs !== null &&
        userRecs.map((rec) => {
          return (
            <UserRec uri={rec.uri} song={rec.song} artist={rec.artist} images={rec.images} />
          );
        })}
    </div>
  );
};
