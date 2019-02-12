/*
 * @file: encryptor.js
 * @description: creating redux store encryptor
 * */

import createEncryptor from "redux-persist-transform-encrypt";

const encryptor = createEncryptor({
  secretKey: "my-super-secret-key-web-profile"
});

export default encryptor;
