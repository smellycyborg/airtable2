import "./styles.css";
import { Provider } from "flovv/react";
import HomePage from "./components/HomePage";
import store from "./store";
import { Suspense } from "react";

export default function App() {
  return (
    <div className="App">
      <Suspense fallback="Loading...">
        <Provider store={store} suspense={true}>
          <HomePage />
        </Provider>
      </Suspense>
    </div>
  );
}