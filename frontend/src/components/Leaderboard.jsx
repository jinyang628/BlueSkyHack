import PropTypes from "prop-types";

// Define the Leaderboard component with leaderboard prop
const Leaderboard = ({ leaderboard }) => {
  // Check if the leaderboard object exists and has entries
  if (!leaderboard || Object.keys(leaderboard).length === 0) {
    return null; // or return a placeholder message/component
  }

  return (
    <div>
      <h3>Hall of Fame:</h3>
      <ul>
        {Object.entries(leaderboard).map(([name, score], index) => (
          <li key={index} style={{ marginBottom: "10px", marginRight: "10px" }}>
            <div>Post: {name}</div>
            <div>Score: {score}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

Leaderboard.propTypes = {
  leaderboard: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default Leaderboard;
