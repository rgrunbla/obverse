import { combineReducers } from "redux";
import chat from "./chat";
import control from "./control";
import assets from "./assets";

export default combineReducers({ chat, control, assets });
