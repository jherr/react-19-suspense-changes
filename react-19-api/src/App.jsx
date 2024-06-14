import { Suspense, useState, use } from "react";

async function getTheTime() {
  return fetch("http://localhost:8080").then((res) => res.json());
}

function TimeFetcher() {
  const [timePromise] = useState(() => getTheTime());
  const { start, end } = use(timePromise);
  return (
    <h2>
      {start} - {end}
    </h2>
  );
}

function Subcomponent() {
  return (
    <Suspense fallback={<h2>Subcomponent suspense...</h2>}>
      <TimeFetcher />
    </Suspense>
  );
}

function App() {
  return (
    <>
      <h1>React 19 - API</h1>
      <Subcomponent />
      <Subcomponent />
    </>
  );
}

export default App;
