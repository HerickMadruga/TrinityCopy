// src/components/FilterButtons.jsx

import React from 'react';

const FilterButtons = ({ items, selectedItem, onSelectItem, classNamePrefix }) => {
  return (
    <div className={`${classNamePrefix}-selector`}>
      {items.map((item) => (
        <button
          key={item}
          className={`${classNamePrefix}-button ${selectedItem === item ? 'active' : ''}`}
          // Ao clicar, chama a função que foi passada pelo App.jsx (handleTechniqueChange)
          onClick={() => onSelectItem(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default React.memo(FilterButtons);