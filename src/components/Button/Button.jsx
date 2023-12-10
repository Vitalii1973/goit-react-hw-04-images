import React from 'react';
import './Button.css';

const Button = ({ onLoadMore, hasMore }) => {
  return (
    <button
      type="button"
      className="load-more-button"
      onClick={onLoadMore}
      style={{ display: hasMore ? 'block' : 'none' }}
    >
      Load more
    </button>
  );
};

export default Button;
