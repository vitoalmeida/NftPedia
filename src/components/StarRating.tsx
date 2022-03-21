// Libraries
import React from 'react';

interface Props {
  value?: number;
  onChange: any;
}

const Star = ({ marked, starId }) => {
  return (
    <span
      data-star-id={starId}
      className="text-[#F5DC59] text-[2.5rem]"
      role="button"
    >
      {marked ? '\u2605' : '\u2606'}
    </span>
  );
};

const StarRating: React.FC<Props> = ({ value, onChange }) => {
  // StarRating states
  const [rating, setRating] = React.useState(Number(value) || 0);
  const [selection, setSelection] = React.useState(0);

  // Funciton to update stars count
  function changeStarsCount(event) {
    setRating(event.target.getAttribute('data-star-id') || rating);
    onChange(event.target.getAttribute('data-star-id'));
  }

  // Function to change star rating on hover
  function hoverOver(event) {
    let val = 0;
    if (event && event.target && event.target.getAttribute('data-star-id'))
      val = event.target.getAttribute('data-star-id');
    setSelection(val);
  }

  return (
    <div
      onMouseOut={() => hoverOver(null)}
      onClick={event => changeStarsCount(event)}
      onMouseOver={hoverOver}
    >
      {Array.from({ length: 5 }, (v, i) => (
        <Star
          starId={i + 1}
          key={`star_${i + 1}`}
          marked={selection ? selection >= i + 1 : rating >= i + 1}
        />
      ))}
    </div>
  );
};

export default StarRating;
