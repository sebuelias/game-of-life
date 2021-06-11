import React, { useState } from 'react';

const numRows = 50;
const numCols = 30;

function App() {
  const [grid, setGrid] = useState(() => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }

    return rows;
  });

  return (
    <div>
      {grid.map((rows, rowIndex) =>
        rows.map((col, colIndex) => (
          <div
          key={`${rowIndex}-${colIndex}`}
            style={{
              width: '20px',
              height: '20px',
              backgroundColor: grid[rowIndex][colIndex] ? 'pink' : undefined,
              border: 'solid 1px black',
            }}
          />
        )),
      )}
    </div>
  );
}

export default App;
