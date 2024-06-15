import { Suspense, use } from "react";

import { USERS, ORDERS } from "./data";
import memoize from "./memoize";

const getOrders = memoize(
  (id) => new Promise((resolve) => setTimeout(() => resolve(ORDERS[id]), 1000))
);
const getUser = memoize(
  (id) => new Promise((resolve) => setTimeout(() => resolve(USERS[id]), 1000))
);

function Orders() {
  return (
    <>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>{order.name}</li>
        ))}
      </ul>
    </>
  );
}

function User() {
  return (
    <>
      <div>User requested at {new Date().toLocaleTimeString()}</div>
      <h2>User {user.name}</h2>
      <Orders id={id} />
    </>
  );
}

function App() {
  return (
    <>
      <h1>Users/Orders - Starter</h1>
      <User id="1" />
    </>
  );
}

export default App;
