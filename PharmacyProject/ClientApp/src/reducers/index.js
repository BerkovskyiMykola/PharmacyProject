import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import profile from "./profile";
import database from "./database";
import user from "./user";
import pharmacy from "./pharmacy";
import drug from "./drug";
import car from "./car";

export default combineReducers({
    auth,
    message,
    profile,
    database,
    user,
    pharmacy,
    drug,
    car
});