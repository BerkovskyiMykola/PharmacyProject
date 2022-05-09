import axios from "axios";
import { CURRENT_DOMAIN } from "../utils/domain";
import authHeader from "./auth-header";

const API_URL = CURRENT_DOMAIN + "/Cars/";

class CarService {
    getCars(id) {
        return axios.get(API_URL + "all/" + id, { headers: authHeader() });
    }

    createCar(number, amountPlaces, state, pharmacyId) {
        return axios.post(API_URL + "create", { number, amountPlaces, state, pharmacyId }, { headers: authHeader() });
    }

    deleteCar(id) {
        return axios.delete(API_URL + "delete/" + id, { headers: authHeader() });
    }

    editCar(id, number, amountPlaces, state) {
        return axios.put(API_URL + "edit/" + id, { id, number, amountPlaces, state }, { headers: authHeader() });
    }
}

export default new CarService();