import axios from "axios";
import { CURRENT_DOMAIN } from "../utils/domain";
import authHeader from "./auth-header";

const API_URL = CURRENT_DOMAIN + "/Pharmacies/";

class PharmacyService {
    getPharmacies() {
        return axios.get(API_URL + "all", { headers: authHeader() });
    }

    createPharmacy(name, address) {
        return axios.post(API_URL + "create", { name, address }, { headers: authHeader() });
    }

    deletePharmacy(id) {
        return axios.delete(API_URL + "delete/" + id, { headers: authHeader() });
    }

    editPharmacy(id, name, address) {
        return axios.put(API_URL + "edit/" + id, { id, name, address }, { headers: authHeader() });
    }
}

export default new PharmacyService();