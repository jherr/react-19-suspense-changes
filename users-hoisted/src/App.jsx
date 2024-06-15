import { Suspense, use } from "react";

import { USERS, ORDERS } from "./data";
import memoize from "./memoize";

const getOrders = memoize(
  (id) => new Promise((resolve) => setTimeout(() => resolve(ORDERS[id]), 1000))
);
const getUser = memoize(
  (id) => new Promise((resolve) => setTimeout(() => resolve(USERS[id]), 1000))
);

function Orders({ ordersPromise }) {
  const orders = use(ordersPromise);
  return (
    <ul>
      {orders.map((order) => (
        <li key={order.id}>{order.name}</li>
      ))}
    </ul>
  );
}

function User({ userPromise, ordersPromise }) {
  const user = use(userPromise);
  return (
    <>
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
      <div>User requested at {new Date().toLocaleTimeString()}</div>
      <div>Orders requested at {new Date().toLocaleTimeString()}</div>
      <Suspense fallback={<h2>Top level suspense...</h2>}>
        <User userPromise={userPromise} ordersPromise={ordersPromise} />
      </Suspense>
    </>
  );
}

export default App;
