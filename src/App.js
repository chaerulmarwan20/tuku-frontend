import { Provider } from "react-redux";
import Route from "./configs/router/MainRoute";
import store from "./configs/redux/store";

import "./index.css";

function App() {
  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
}

export default App;
