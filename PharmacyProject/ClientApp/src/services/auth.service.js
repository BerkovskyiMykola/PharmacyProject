import axios from "axios";
import { CURRENT_DOMAIN } from "../utils/domain";

const API_URL = CURRENT_DOMAIN + "/Account/";

class AuthService {

    login(email, password) {
        return axios
            .post(API_URL + "login", { email, password })
            .then((response) => {
                if (response.data.token) {
                    sessionStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        sessionStorage.removeItem("user");
    }
}

export default new AuthService();