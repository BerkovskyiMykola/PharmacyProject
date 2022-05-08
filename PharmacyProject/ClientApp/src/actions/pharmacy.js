import EventBus from "../common/EventBus";
import { CREATE_PHARMACY_ERROR, CREATE_PHARMACY_SUCCESS, DELETE_PHARMACY_ERROR, DELETE_PHARMACY_SUCCESS, EDIT_PHARMACY_ERROR, EDIT_PHARMACY_SUCCESS, GET_PHARMACIES } from "../constants/pharmacy";
import { SET_MESSAGE } from "../constants/message";
import pharmacyService from "../services/pharmacy.service"
import { toast } from "react-toastify";

export const getPharmacies = (t) => (dispatch) => {
    return pharmacyService.getPharmacies().then(
        (responce) => {
            dispatch({
                type: GET_PHARMACIES,
                payload: { pharmacies: responce.data }
            });

            toast.success(t("LoadSuccess"));
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }
            else {
                toast.error(t("Error"));
            }
        }
    )
}

export const createPharmacy = (name, address, t) => (dispatch) => {
    return pharmacyService.createPharmacy(name, address).then(
        (responce) => {
            dispatch({
                type: CREATE_PHARMACY_SUCCESS,
                payload: { pharmacy: responce.data }
            });

            toast.success(t("CreateSuccess"));

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: CREATE_PHARMACY_ERROR
            });

            const message = error.response.data.title || error.response.data;

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    )
}

export const deletePharmacy = (id, t) => (dispatch) => {
    return pharmacyService.deletePharmacy(id).then(
        (responce) => {
            dispatch({
                type: DELETE_PHARMACY_SUCCESS,
                payload: { id }
            });

            toast.success(t("DeleteSuccess"));
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }
            else {
                toast.error(t("Error"));
            }

            dispatch({
                type: DELETE_PHARMACY_ERROR
            });
        }
    )
}

export const editPharmacy = (id, name, address, t) => (dispatch) => {
    return pharmacyService.editPharmacy(id, name, address).then(
        (responce) => {
            dispatch({
                type: EDIT_PHARMACY_SUCCESS,
                payload: { id, name, address }
            });

            toast.success(t("EditSuccess"));

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: EDIT_PHARMACY_ERROR
            });

            const message = error.response.data.title || error.response.data;

            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });

            return Promise.reject();
        }
    )
}