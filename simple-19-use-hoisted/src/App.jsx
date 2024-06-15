import { Suspense, use } from "react";

import memoize from "./memoize";

const getTime = memoize(
  (id) =>
    new Promise((resolve) =>
      setTimeout(
        () => resolve(`${id} = started ${new Date().toLocaleTimeString()}`),
        1000
      )
    )
);

function TimeDisplay({ id, timePromise }) {
  const time = use(timePromise);
  return <h2>{time}</h2>;
}

function App() {
  const time1 = getTime("time1");
  const time2 = getTime("time2");

  return (
    <>
      <h1>React 19 - Simple with Use (but hoisted)</h1>
      <Suspense fallback={<h2>Top level suspense...</h2>}>
        <TimeDisplay id="time1" timePromise={time1} />
        <TimeDisplay id="time2" timePromise={time2} />
      </Suspense>
    </>
  );
}

export default App;
