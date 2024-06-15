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

function TimeFetcher({ timePromise }) {
  const time = use(timePromise);
  return <h2>{time}</h2>;
}

function App() {
  const time1promise = getTime("1");
  const time2promise = getTime("2");
  return (
    <>
      <h1>React 18 - Starter</h1>
      <Suspense fallback={<h2>Loading...</h2>}>
        <TimeFetcher timePromise={time1promise} />
        <TimeFetcher timePromise={time2promise} />
      </Suspense>
    </>
  );
}

export default App;
