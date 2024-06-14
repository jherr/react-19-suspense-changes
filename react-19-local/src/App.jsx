import { Suspense, useState, use } from "react";

async function getTheTime() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(new Date().toLocaleTimeString());
    }, 2000);
  });
}

function TimeFetcher() {
  const [timePromise] = useState(() => getTheTime());
  const time = use(timePromise);
  return <h2>{time}</h2>;
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
      <h1>React 19 - Local timer</h1>
      <Subcomponent />
      <Subcomponent />
    </>
  );
}

export default App;
