import { Suspense, use } from "react";

import { USERS, ORDERS } from "./data";
import memoize from "./memoize";

const getOrders = memoize(
  (id) =>
    new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            started: new Date().toLocaleTimeString(),
            orders: ORDERS[id],
          }),
        1000
      )
    )
);
const getUser = memoize(
  (id) =>
    new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            started: new Date().toLocaleTimeString(),
            user: USERS[id],
          }),
        1000
      )
    )
);

function Orders({ ordersPromise }) {
  const { started, orders } = use(ordersPromise);
  return (
    <>
      <div>Orders requested at {started}</div>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>{order.name}</li>
        ))}
      </ul>
    </>
  );
}

function User({ userPromise, ordersPromise }) {
  const { started, user } = use(userPromise);
  return (
    <>
      <div>User requested at {started}</div>
      <h2>User {user.name}</h2>
      <Orders ordersPromise={ordersPromise} />
    </>
  );
}

function App() {
  const userPromise = getUser(1);
  const ordersPromise = getOrders(1);

  return (
    <>
      <h1>Users/Orders Example (hoisted)</h1>
      <Suspense fallback={<h2>Top level suspense...</h2>}>
        <User userPromise={userPromise} ordersPromise={ordersPromise} />
      </Suspense>
    </>
  );
}

export default App;
