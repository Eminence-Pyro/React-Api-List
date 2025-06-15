import React from 'react';

const ListComponent = ({ items, renderItem, emptyMessage }) => {
  if (!items || items.length === 0) {
    return <p>{emptyMessage || "No items to display."}</p>;
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {items.map((item, index) => (
        <li key={index} style={{ marginBottom: '1rem' }}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
};

export default ListComponent;
