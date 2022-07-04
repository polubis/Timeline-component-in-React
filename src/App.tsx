import { useState } from "react";
import { DataSetsKeys, DATA_SETS } from "timeline/mocks";
import { Timeline } from "timeline/Timeline";
import css from "./App.module.scss";

function App() {
  const [currentData, setCurrentData] = useState(DATA_SETS.BIG);

  return (
    <>
      <Timeline data={currentData.data} onItemClick={() => {}} />

      <div className={css.footer}>
        {(Object.keys(DATA_SETS) as DataSetsKeys[]).map((key) => (
          <button key={key} onClick={() => setCurrentData(DATA_SETS[key])}>
            {DATA_SETS[key].label}
          </button>
        ))}
      </div>
    </>
  );
}

export default App;
