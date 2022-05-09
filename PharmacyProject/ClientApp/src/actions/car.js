import EventBus from "../common/EventBus";
import { SET_MESSAGE } from "../constants/message";
import { CREATE_CAR_ERROR, CREATE_CAR_SUCCESS, DELETE_CAR_ERROR, DELETE_CAR_SUCCESS, EDIT_CAR_ERROR, EDIT_CAR_SUCCESS, GET_CARS } from "../constants/car";
import carService from "../services/car.service";
import { toast } from "react-toastify";

export const getCars = (id, t) => (dispatch) => {
    return carService.getCars(id).then(
        (responce) => {
            dispatch({
                type: GET_CARS,
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

export const editCar = (id, number, amountPlaces, state, t) => (dispatch) => {
    return carService.editCar(id, number, amountPlaces, state).then(
        (responce) => {
            dispatch({
                type: EDIT_CAR_SUCCESS,
                payload: { id, number, amountPlaces, state }
            });

            toast.success(t("EditSuccess"));

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: EDIT_CAR_ERROR
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

export const createCar = (number, amountPlaces, state, pharmacyId, t) => (dispatch) => {
    return carService.createCar(number, amountPlaces, state, pharmacyId).then(
        (responce) => {
            dispatch({
                type: CREATE_CAR_SUCCESS,
                payload: { car: responce.data }
            });

            toast.success(t("CreateSuccess"));

            return Promise.resolve();
        },
        (error) => {
            if (error.response && error.response.status === 401) {
                EventBus.dispatch("logout");
            }

            dispatch({
                type: CREATE_CAR_ERROR
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

export const deleteCar = (id, t) => (dispatch) => {
    return carService.deleteCar(id).then(
        (responce) => {
            dispatch({
                type: DELETE_CAR_SUCCESS,
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
                type: DELETE_CAR_ERROR
            });
        }
    )
}