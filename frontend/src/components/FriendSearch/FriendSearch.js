import React, { useEffect, useState } from "react";
import { getCookie } from "../../utils/auth";
import { FriendResult } from "./FriendResult";

export const FriendSearch = (props) => {
  const [friends, setFriends] = useState([]);
  const [addedFriends, setAddedFriends] = useState([]);
  const [render, setRender] = useState(0);

  useEffect(() => {
    const url = "/api/get_friends";
    const user = getCookie("user");

    const data = {
      user: user,
    };

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((parsed) => {
        setFriends(parsed["friends"]);
        console.log(parsed["friends"]);
      });
  }, []);

  const addFriend = (friendName) => {
    let currState = addedFriends;
    currState.push(friendName);
    setAddedFriends(currState);
    setRender(render + 1);
  };

  
  return (
    <div>
      <h3 style={{ color: "black" }}>Available Friends</h3>
      {friends.length > 0 ? <ul
        style={{
          padding: "none",
          width: "100%",
          margin: "auto",
          maxHeight: "15rem",
          overflowY: "auto",
          borderStyle: "solid",
          borderColor: "black",
          textAlign: "left",
        }}
      >
        {
          friends.map((friend) => {
            return <FriendResult addFriend={addFriend} friend={friend} />;
          })}
      </ul> : <h2>You can only send direct recs to users that you both follow, and are followed by...</h2>}

      {addedFriends.length > 0 && (
        <h2 style={{ display: "block" }}>
          {addedFriends.length < 3
            ? "Recommend to " + addedFriends[0] + ", and " + addedFriends[1]
            : "Recommend to " +
              addedFriends[0] +
              " and " +
              (addedFriends.length - 1) +
              " others"}
        </h2>
      )}

      {addedFriends.length > 0 && (
        <button
          onClick={() => {
            props.createDirectRec(addedFriends);
          }}
        >
          Make Recommendation
        </button>
      )}
    </div>
  );
};
