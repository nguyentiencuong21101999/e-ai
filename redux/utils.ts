import { RootState } from "./store";

export const getReduxState: () => RootState = () => {
  return require("./store").store.getState();
};
