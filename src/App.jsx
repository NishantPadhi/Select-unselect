import React, { useState, useEffect, useMemo } from "react";
import "./style.css";

const DisplayBox = ({ row, column, value, selectedBoxes }) => {
  const key = `${row}-${column}`;
  return (
    <div
      key={`input-${key}`}
      id={`input-${key}`}
      className={`displayBox ${selectedBoxes?.includes(key) ? "bg-green" : ""}`}
      style={{
        visibility: value ? "" : "hidden",
        cursor: value ? "pointer" : "",
      }}
      data-display={value}
    ></div>
  );
};

function App(props) {
  const [input, updateInput] = useState([
    [1, 0, 1, 1],
    [1, 0, 1, 0],
    [0, 1, 1, 1],
  ]);
  const [selectedBoxes, updateSelectedBoxes] = useState([]);
  const [isAllBoxesSelected, setIsAllBoxesSelected] = useState(false);
  const totalItemCount = useMemo(() => {
    return input.reduce(
      (acc, row) => {
        acc += row.filter((col) => col === 1).length;
        return parseInt(acc);
      },
      [0]
    );
  }, [input]);

  useEffect(() => {
    if (isAllBoxesSelected) {
      const intervalId = setTimeout(() => {
        if (!selectedBoxes.length) {
          setIsAllBoxesSelected(false);
          clearInterval(intervalId);
          return;
        }
        const storedBox = [...selectedBoxes];
        storedBox.shift();
        updateSelectedBoxes(storedBox);
      }, [2000]);
      return () => clearTimeout(intervalId);
    }
  }, [isAllBoxesSelected, selectedBoxes]);

  const onClickHandler = (e) => {
    e.persist();
    const value = e.target.getAttribute("data-display");
    const cellData = e?.target?.getAttribute("id")?.split("-");
    if (value && !isAllBoxesSelected) {
      const key = `${cellData[1]}-${cellData[2]}`;
      if (!selectedBoxes.includes(key)) {
        updateSelectedBoxes([...selectedBoxes, key]);
        if (selectedBoxes.length + 1 === totalItemCount) {
          setIsAllBoxesSelected(true);
        }
      }
    }
  };

  return (
    <div className="App" onClick={onClickHandler}>
      {input.map((inputValue, row) => (
        <div
          style={{ display: "flex", marginBottom: "10px" }}
          key={`input-${row}`}
        >
          {inputValue.map((value, column) => (
            <DisplayBox
              row={row}
              column={column}
              value={value}
              selectedBoxes={selectedBoxes}
            />
          ))}
        </div>
      ))}
      <DisplayBox />
    </div>
  );
}

export default App;
