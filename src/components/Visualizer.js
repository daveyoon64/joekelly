import React, {useState, useEffect, useCallback} from 'react'
import {Node} from './Node'

const Visualizer = () => {
  const [grid, setGrid] = useState([])
  const [isNew, setIsNew] = useState(true)

  const getInitialGrid = useCallback(() => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push(createNode(col, row));
      }
      grid.push(currentRow);
    }
    return grid;
  }, []);

  useEffect(() => {
    if (isNew) {
      const grid = getInitialGrid();
      setGrid(grid)
      setIsNew(false) 
    }
  }, [grid, getInitialGrid, isNew]);

  const createNode = (col, row) => {
    return {
      col,
      row
    };
  };

  return(
    <div className="grid">
      {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const { row, col } = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      row={row}></Node>
                  );
                })}
              </div>
            );
          })}
    </div>
  )
}

export default Visualizer;