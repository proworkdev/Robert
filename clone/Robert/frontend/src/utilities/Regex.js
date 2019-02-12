/*
 * @file: Regex.js
 * @description: Regex used for validation in application.
 * */



let Regex = {
  validateEmail: function(val) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      val
    );
  },
  validateMultipleEmail: function(val) {
    return /^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;,.](([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+)*$/.test(
      val
    );
  },
  validateMobile: function(val) {
    return /^\+(?:[0-9] ?){6,14}[0-9]$/.test(val);
  },
  // validateMobile: function(val) {
  //   return /^\+?\d{9,12}$/.test(val);
  // },
  validateFreeSpace: function(val) {
    return /^$|^[^\s]+(\s+[^\s]+)*$/.test(val);
  },
  validateMobileWithoutCC: function(val) {
    return /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/.test(
      val
    );
  },
  validateString: function(val) {
    return /^\S[a-zA-Z\x20]{2,25}$/.test(val);
  },
  validatePassword: function(val) {
    return /^(?=.*[A-Za-z])(?=.*[0-9!@#$%^&*_])[A-Za-z0-9!@#$%^&*_]{8,32}$/.test(
      val
    );
  },
  validateNumbers: function(val) {
    return /^[0-9]{0,}$/.test(val);
  },
  validateInteger: function(val) {
    return /^\d*[1-9]\d*$/.test(val);
  },
  validateURL: function(url) {
    return /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/.test(
      url
    );
  },
  validatePrice(val) {
    return /^(\d*([.,](?=\d{1}))?\d+)?$/.test(val);
  },
  validateAlphaNumberic(val) {
    return /^[a-zA-Z0-9]{0,20}$/.test(val);
  },
  getNumbericValuesFromString(val) {
    return val.match(/^\d+|\d+\b|\d+(?=\w)/g);
  },

  validateVehicleReg(number) {
    let regex = /^([A-Z]{3}\s?(\d{3}|\d{2}|d{1})\s?[A-Z])|([A-Z]\s?(\d{3}|\d{2}|\d{1})\s?[A-Z]{3})|(([A-HK-PRSVWY][A-HJ-PR-Y])\s?([0][2-9]|[1-9][0-9])\s?[A-HJ-PR-Z]{3})$/;
    return regex.test(number.trim().toUpperCase());
  },

  validateEmoji(text) {
    let reg = /[\uD83C-\uDBFF\uDC00-\uDFFF]+/g;
    return reg.test(text);
  },
  validatePasswordValue(val) {
    return /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]\S{5,16}$/.test(val);
  }
};

module.exports = Regex;
