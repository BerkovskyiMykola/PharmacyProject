import { CREATE_CAR_SUCCESS, DELETE_CAR_SUCCESS, EDIT_CAR_SUCCESS, GET_CARS } from "../constants/car";

const initialState = {
    name: "",
    address: "",
    cars: []
};

export default function CAR(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_CARS:
            return {
                name: payload.name,
                address: payload.address,
                cars: payload.cars
            }
        case CREATE_CAR_SUCCESS:
            return {
                ...state,
                cars: [...state.cars, payload.car]
            }
        case DELETE_CAR_SUCCESS:
            return {
                ...state,
                cars: state.cars.filter(x => x.id !== payload.id)
            }
        case EDIT_CAR_SUCCESS:
            return {
                ...state,
                cars: state.cars.map(item => {
                    if (item.id === payload.id)
                        return {
                            ...item,
                            number: payload.number,
                            amountPlaces: payload.amountPlaces,
                            state: payload.state
                        }
                    return item;
                })
            }
        default:
            return state;
    }
}