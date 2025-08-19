import { createRoot } from "react-dom/client";
import store, { persistor } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";

import { Provider } from "react-redux";
// import { updateUserSuccess } from './redux/user/userSlice';
import "./index.css";
import App from "./App.jsx";
// import { PersistGate } from "redux-persist/lib/integration/react";
// const savedUser = localStorage.getItem('currentUser');
// if (savedUser) {
//   store.dispatch(updateUserSuccess(JSON.parse(savedUser)));
// }
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
