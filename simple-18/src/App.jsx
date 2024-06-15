import { Suspense } from "react";

import memoize from "./memoize";

function wrapPromise(promise) {
  let status = "pending";
  let response;

  const suspender = promise.then(
    (res) => {
      status = "success";
      response = res;
    },
    (err) => {
      status = "error";
      response = err;
    }
  );

  const handler = {
    pending: () => {
      throw suspender;
    },
    error: () => {
      throw response;
    },
    default: () => response,
  };

  return () => handler[status]?.() ?? response;
}

const getTime = memoize((id) =>
  wrapPromise(
    new Promise((resolve) =>
      setTimeout(
        () => resolve(`${id} = started ${new Date().toLocaleTimeString()}`),
        1000
      )
    )
  )
);

function TimeFetcher({ id }) {
  const time = getTime(id);
  return <h2>{time()}</h2>;
}

function App() {
  return (
    <>
      <h1>React 18 - Simple</h1>
      <Suspense fallback={<h2>Top level suspense...</h2>}>
        <TimeFetcher id="time1" />
        <TimeFetcher id="time2" />
      </Suspense>
    </>
  );
}

export default App;
