import { Suspense, useState, use } from "react";

async function getTheTime() {
  return fetch("http://localhost:8080").then((res) => res.json());
}

function TimeFetcher({ timePromise }) {
  const { start, end } = use(timePromise);
  return (
    <h2>
      {start} - {end}
    </h2>
  );
}

function App() {
  const [timePromise1] = useState(() => getTheTime());
  const [timePromise2] = useState(() => getTheTime());
  return (
    <>
      <h1>React 19 - API Request In Parent</h1>
      <Suspense fallback={<h2>timePromise1 suspense...</h2>}>
        <TimeFetcher timePromise={timePromise1} />
      </Suspense>
      <Suspense fallback={<h2>timePromise2 suspense...</h2>}>
        <TimeFetcher timePromise={timePromise2} />
      </Suspense>
    </>
  );
}

export default App;
