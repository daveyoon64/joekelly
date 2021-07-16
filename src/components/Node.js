import React from 'react';

import './Node.css';

export const Node = ({row, col}) => {
  return (
    <div id={`node-${row}-${col}`} className={'node'}></div>
  );
}