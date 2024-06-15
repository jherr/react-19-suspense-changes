const getTime = (id) =>
  new Promise((resolve) =>
    setTimeout(
      () => resolve(`${id} = started ${new Date().toLocaleTimeString()}`),
      1000
    )
  );

function TimeFetcher({ id }) {
  return <h2>{time()}</h2>;
}

function App() {
  return (
    <>
      <h1>React 18 - Starter</h1>
      <TimeFetcher id="time1" />
      <TimeFetcher id="time2" />
    </>
  );
}

export default App;
