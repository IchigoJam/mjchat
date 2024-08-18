import { serveMixJuice } from "https://ichigojam.github.io/mixjuice_util/serveMixJuice.js";

const IJ_CLEARBELOW = "\u000c";
const IJ_COMMENT = "'";

const MAX_MESSAGES = 15;
const MAX_MESSAGE_LEN = 30;

const list = [];

const getMessage = (s) => {
  s = decodeURIComponent(s); // for IchigoJam web??
  s = s.replace(/\r/g, " ");
  s = s.replace(/\n/g, " ");
  if (s.length > MAX_MESSAGE_LEN) s = s.substring(0, MAX_MESSAGE_LEN);
  return s;
};

serveMixJuice((path, params, data) => {
  if (params.get("C") == "CLEAR") {
    list.length = 0;
    return IJ_CLEARBELOW + IJ_COMMENT + "CLEARED\n";
  }
  const mes = getMessage(path.substring(1));
  if (mes) {
    list.push(IJ_COMMENT + mes);
    if (list.length >= MAX_MESSAGES) {
      list.splice(0, 1);
    }
  }
  return IJ_CLEARBELOW + list.join("\n") + "\n";
});
