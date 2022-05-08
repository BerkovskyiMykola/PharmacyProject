import axios from "axios";
import { CURRENT_DOMAIN } from "../utils/domain";
import authHeader from "./auth-header";

const API_URL = CURRENT_DOMAIN + "/Drugs/";

class DrugService {
    getDrugs(id) {
        return axios.get(API_URL + "all/" + id, { headers: authHeader() });
    }

    createDrug(name, price, amount, pharmacyId) {
        return axios.post(API_URL + "create", { name, price, amount, pharmacyId }, { headers: authHeader() });
    }

    deleteDrug(id) {
        return axios.delete(API_URL + "delete/" + id, { headers: authHeader() });
    }

    editDrug(id, name, price, amount) {
        return axios.put(API_URL + "edit/" + id, { id, name, price, amount }, { headers: authHeader() });
    }
}

export default new DrugService();