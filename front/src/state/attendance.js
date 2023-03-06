import { atom } from "recoil";
export const attendanceInfoAtom = atom({
  key: "attendanceInfo",
  default: null,
});

export const attendanceListAtom = atom({
  key: "attendanceList",
  default: [],
});
