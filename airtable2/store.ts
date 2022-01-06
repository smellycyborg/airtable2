import createStore from "flovv";
import query from "./commands/query";

const store = createStore({
  state: {},
  commands: {
    query
  }
});

export default store;