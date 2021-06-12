import React, { useCallback, useRef, useState } from 'react';
import produce from 'immer';

const numRows = 50;
const numCols = 30;

const cellLifeChecks = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

const generateRandomGrid = (randomisingFactor) => {
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    rows.push(
      Array.from(Array(numCols), () =>
        Math.random() > randomisingFactor ? 1 : 0,
      ),
    );
  }
  return rows;
};

const generateEmptyGrid = () => {
  const rows = [];
  for (let i = 0; i < numRows; i += 1) {
    rows.push(Array.from(Array(numCols), () => 0));
  }
  return rows;
};

function App() {
  // TODO use rownum and colnum from input
  const [grid, setGrid] = useState(() => {
    return generateEmptyGrid();
  });
  const [running, setRuning] = useState(false);
  // !USe this from user input
  // const [randomisingFactor, setRandomisingFactor] = useState(0.8);
  const runningRef = useRef(running);
  runningRef.current = running;

  // const updateCell = (rowIndex, colIndex) => {
  //   let newGrid = [...grid];
  //   newGrid[rowIndex][colIndex] = newGrid[rowIndex][colIndex] ? 0 : 1;
  //   setGrid(newGrid);
  // };

  const simulateGameOfLife = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 0; i < numRows; i++) {
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            cellLifeChecks.forEach(([x, y]) => {
              const newI = i + x;
              const newK = k + y;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });

            if (neighbors < 2 || neighbors > 3) {
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              gridCopy[i][k] = 1;
            }
          }
        }
      });
    });
    // setGrid((grid) => {

    //   return produce(grid, newGrid => {
    //     for (let i = 0; i < numRows; i += 1) {
    //       for (let j = 0; j < numCols; j += 1) {
    //         let neighbors = 0;
    //         cellLifeChecks.forEach(([x, y]) => {
    //           const newI = i + x;
    //           const newJ = j + y;
    //           if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
    //             neighbors += grid[newI][newJ];
    //           }

    //           if (neighbors < 2 || neighbors > 3) {
    //             newGrid[i][j] = 0;
    //           } else if (grid[i][j] === 0 && neighbors === 3) {
    //             newGrid[i][j] = 1;
    //           }
    //         });
    //       }
    //     }
    //   })

    // });

    setTimeout(simulateGameOfLife, 100);
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setRuning(!running);
          if (!running) {
            runningRef.current = true;
            simulateGameOfLife();
          }
        }}
      >
        {running ? 'Stop' : 'Start'}
      </button>

      <button
        onClick={() => {
          setGrid(generateEmptyGrid());
        }}
      >
        Clear
      </button>
      <button
        onClick={() => {
          setGrid(generateRandomGrid(/* randomisingFactor */0.7));
        }}
      >
        Random
      </button>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${numCols}, 20px)`,
        }}
      >
        {grid.map((rows, rowIndex) =>
          rows.map((col, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[rowIndex][colIndex] = grid[rowIndex][colIndex]
                    ? 0
                    : 1;
                });
                setGrid(newGrid);
              }}
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: grid[rowIndex][colIndex] ? 'black' : undefined,
                border: 'solid 1px black',
              }}
            />
          )),
        )}
      </div>
    </>
  );
}

export default App;
