import { Suspense, useState } from "react";

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

async function getTheTime() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(new Date().toLocaleTimeString());
    }, 1000);
  });
}

function TimeDisplay({ time }) {
  return <h2>{time()}</h2>;
}

function TimeFetcher() {
  const [time] = useState(() => wrapPromise(getTheTime()));
  return (
    <Suspense fallback={<h2>Child suspense...</h2>}>
      <TimeDisplay time={time} />
    </Suspense>
  );
}

function App() {
  return (
    <>
      <h1>React 18 - Local timer</h1>
      <TimeFetcher />
      <TimeFetcher />
    </>
  );
}

export default App;
