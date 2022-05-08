import EventBus from "../common/EventBus";
import { SET_MESSAGE } from "../constants/message";
import { CREATE_DRUG_ERROR, CREATE_DRUG_SUCCESS, DELETE_DRUG_ERROR, DELETE_DRUG_SUCCESS, EDIT_DRUG_ERROR, EDIT_DRUG_SUCCESS, GET_DRUGS } from "../constants/drug";
import drugService from "../services/drug.service";
import { toast } from "react-toastify";

export const getDrugs = (id, t) => (dispatch) => {
    return drugService.getDrugs(id).then(
        (responce) => {
            dispatch({
                type: GET_DRUGS,
                payload: responce.data
            });

            toast.success(t("LoadSuccess"));

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }
            else {
                toast.error(t("Error"));
            }

            return Promise.reject();
        }
    )
}

export const editDrug = (id, name, price, amount, t) => (dispatch) => {
    return drugService.editDrug(id, name, price, amount).then(
        (responce) => {
            dispatch({
                type: EDIT_DRUG_SUCCESS,
                payload: { id, name, price, amount }
            });

            toast.success(t("EditSuccess"));

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: EDIT_DRUG_ERROR
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

export const createDrug = (name, price, amount, pharmacyId, t) => (dispatch) => {
    return drugService.createDrug(name, price, amount, pharmacyId).then(
        (responce) => {
            dispatch({
                type: CREATE_DRUG_SUCCESS,
                payload: { drug: responce.data }
            });

            toast.success(t("CreateSuccess"));

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: CREATE_DRUG_ERROR
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

export const deleteDrug = (id, t) => (dispatch) => {
    return drugService.deleteDrug(id).then(
        (responce) => {
            console.log(id);
            dispatch({
                type: DELETE_DRUG_SUCCESS,
                payload: { id }
            });

            toast.success(t("DeleteSuccess"));

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }
            else {
                toast.error(t("Error"));
            }

            dispatch({
                type: DELETE_DRUG_ERROR
            });
        }
    )
}