import { useState } from "react";

import PropTypes from "prop-types";

import Star from "./Star";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyles = {
  display: "flex",
  gap: "1px",
};

const textStyle = {
  lineHeight: "1",
  margin: "0",
  fontWeight: "bold",
};

function StarRating({
  maxRating = 5,
  fillColor = "#fcd34d",
  strokeColor = "#fcd34d",
  size = "30px",
  ratingTextColor = "#fcd34d",
  ratingMessages = [],
  // may have seen - never initialise state from props
  // only true if want state to stay in sync with prop
  // this case just initial value
  defaultRating = 0,
  onSetRating = null,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const handleRating = (rating) => {
    setRating(rating);
    onSetRating && onSetRating(rating);
  };

  const handleHover = (tempRating) => {
    setTempRating(tempRating);
  };

  const handleCancelHover = () => setTempRating(0);

  return (
    <div style={containerStyle}>
      <div style={starContainerStyles}>
        {Array.from({ length: maxRating }).map((_, i) => (
          <Star
            key={i}
            full={tempRating ? i + 1 <= tempRating : i + 1 <= rating}
            onRate={() => handleRating(i + 1)}
            onHover={() => handleHover(i + 1)}
            onCancelHover={handleCancelHover}
            fillColor={fillColor}
            strokeColor={strokeColor}
            size={size}
            ratingMessages={ratingMessages}
          >
            S{i + 1}
          </Star>
        ))}
      </div>
      <p
        style={{
          ...textStyle,
          color: ratingTextColor,
          fontSize: `${size / 1.5}px`,
        }}
      >
        {ratingMessages.length === maxRating
          ? ratingMessages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </p>
    </div>
  );
}

StarRating.propTypes = {
  maxRating: PropTypes.number,
  fillColor: PropTypes.string,
  strokeColor: PropTypes.string,
  size: PropTypes.string,
  ratingTextColor: PropTypes.string,
  ratingMessages: PropTypes.arrayOf(PropTypes.string),
  defaultRating: PropTypes.number,
  onSetRating: PropTypes.func,
};

export default StarRating;
