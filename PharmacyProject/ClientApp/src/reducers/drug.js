import { CREATE_DRUG_SUCCESS, DELETE_DRUG_SUCCESS, EDIT_DRUG_SUCCESS, GET_DRUGS } from "../constants/drug";

const initialState = {
    name: "",
    address: "",
    drugs: []
};

export default function drug(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_DRUGS:
            return {
                name: payload.name,
                address: payload.address,
                drugs: payload.drugs
            }
        case CREATE_DRUG_SUCCESS:
            return {
                ...state,
                drugs: [...state.drugs, payload.drug]
            }
        case DELETE_DRUG_SUCCESS:
            return {
                ...state,
                drugs: state.drugs.filter(x => x.id !== payload.id)
            }
        case EDIT_DRUG_SUCCESS:
            return {
                ...state,
                drugs: state.drugs.map(item => {
                    if (item.id === payload.id)
                        return {
                            ...item,
                            name: payload.name,
                            price: payload.price,
                            amount: payload.amount
                        }
                    return item;
                })
            }
        default:
            return state;
    }
}