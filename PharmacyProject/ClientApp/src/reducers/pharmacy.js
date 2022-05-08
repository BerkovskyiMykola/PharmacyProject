import { CREATE_PHARMACY_SUCCESS, DELETE_PHARMACY_SUCCESS, EDIT_PHARMACY_SUCCESS, GET_PHARMACIES } from "../constants/pharmacy";

const initialState = {
    pharmacies: []
};

export default function pharmacy(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_PHARMACIES:
            return {
                ...state,
                pharmacies: payload.pharmacies
            }
        case CREATE_PHARMACY_SUCCESS:
            return {
                ...state,
                pharmacies: [...state.pharmacies, payload.pharmacy]
            }
        case DELETE_PHARMACY_SUCCESS:
            return {
                ...state,
                pharmacies: state.pharmacies.filter(x => x.id !== payload.id)
            }
        case EDIT_PHARMACY_SUCCESS:
            return {
                ...state,
                pharmacies: state.pharmacies.map(pharmacy => {
                    if (pharmacy.id === payload.id)
                        return {
                            ...pharmacy,
                            name: payload.name,
                            address: payload.address,
                        }
                    return pharmacy;
                })
            }
        default:
            return state;
    }
}