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

function TimeFetcher({ id }) {
  const time = use(getTime(id));
  return <h2>{time}</h2>;
}

function App() {
  return (
    <>
      <h1>React 19 - Simple with Use</h1>
      <Suspense fallback={<h2>Top level suspense...</h2>}>
        <TimeFetcher id="time1" />
        <TimeFetcher id="time2" />
      </Suspense>
    </>
  );
}

export default App;
