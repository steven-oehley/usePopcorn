import { useState } from "react";

import WatchList from "./components/WatchedList";
import WatchedSummary from "./components/WatchedSummary";

import { tempWatchedData } from "../../../../data/tempData";

function WatchBox() {
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>
      {isOpen2 && (
        <>
          <WatchedSummary watched={watched} />
          <WatchList watched={watched} />
        </>
      )}
    </div>
  );
}

export default WatchBox;
