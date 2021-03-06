import React from "react";
import moment from "moment";

//ThoughtsCard component needs a lot of data that was gathered in App component when
//doing the main Fetch to get the initial thoughts array, so we get it passed here via props
export const ThoughtsCard = ({ id, message, username, timeCreated, hearts, addLike }) => {
  // Technigo's API: const LIKE_URL = `https://happy-thoughts-technigo.herokuapp.com/thoughts/${id}/like`;
  const LIKE_URL = `https://vane-happy-thoughts.herokuapp.com/thoughts/${id}/like`;

  //handleLikes is the function that will add a heart to the specific thought in the API
  //by doing a POST request
  //using that thought's id we make sure we add the heart to the right thought
  const handleLikes = () => {
    //Stretch goal: created a click counter so we know how many times the Heart button
    //has been clicked and send that data in the callback function to App component
    let clicks = 0;
    clicks += 1;
    fetch(LIKE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //addLike is a function we got from App sent as prop, and is responsible for visually
      //adding +1 to the amount of likes a thought has (it is explained in the App component)
    }).then(() => {
      addLike(id, clicks);
    });
  };

  return (
    <div className="thought-card">
      <p>{message}</p>
      <p>Posted by: {username}</p>
      <div className="heart-time-container">
        <p>
          <button
            onClick={handleLikes}
            className="heart-button"
            //Condition to determine heart button's back color depending on the amount of hears it has
            style={{ backgroundColor: hearts > 0 ? "#ffadad" : "#f2f0f0" }}>
            <span role="img" aria-label="Heart emoji">
              &#128151;
            </span>
          </button>
          x {hearts}
        </p>
        {/* Using the Moment.js package to determine when thought was posted */}
        <p className="time-created">
          {moment(timeCreated).fromNow()}
        </p>
      </div>
    </div>
  );
};
