/*
 * @file: index.js
 * @description: Combine all reducers with persist settings.
 * */

import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import user from "./user";
import encryptor from "./encryptor";

// user state to be stored in storage, but lets not persist someEmphemeralKey
const userPersistConfig = {
  key: "user",
  storage: storage,
  transforms: [encryptor]
};

/*********** Combine reducers **********/
const webProfile = combineReducers({
  user: persistReducer(userPersistConfig, user)
});

export default webProfile;
