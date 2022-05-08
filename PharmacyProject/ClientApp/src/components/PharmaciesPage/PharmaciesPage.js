import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import List from '../ListComponents/List'
import { useTranslation } from 'react-i18next';
import { createPharmacy, deletePharmacy, editPharmacy, getPharmacies } from '../../actions/pharmacy';
import ModalWindow from '../ModalWindow/ModalWindow';
import { clearMessage } from '../../actions/message';
import { FieldInput } from '../FormComponents';

const PharmaciesPage = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [model, setModel] = useState({ id: "", name: "", address: "" });

    const { pharmacies, message } = useSelector(state => ({
        pharmacies: state.pharmacy.pharmacies,
        message: state.message.message
    }), shallowEqual)

    useEffect(() => {
        dispatch(getPharmacies(t));
    }, [dispatch, t])

    const clearFields = () => {
        setModel({ id: "", name: "", address: "" });
    }

    const createRecord = () => {
        dispatch(createPharmacy(model.name, model.address, t))
            .then(() => {
                setModalAdd(false);
                dispatch(clearMessage());
                clearFields();
            })
            .catch(() => { })
    }

    const getPharmacyValues = (item) => {
        setModel({ ...item });
        dispatch(clearMessage());
        setModalEdit(true);
    }

    const editRecord = () => {
        console.log(model);
        dispatch(editPharmacy(model.id, model.name, model.address, t))
            .then(() => {
                setModalEdit(false);
                dispatch(clearMessage());
                clearFields();
            })
            .catch(() => { })
    }

    const action = (item) => {
        return (
            <td>
                <button
                    onClick={() => { getPharmacyValues(item) }}
                    style={{ marginRight: "3px" }}
                    className="btn btn-outline-success btn-sm float-left">
                    <i className="bi-pencil-square" />
                </button>
                <button
                    onClick={() => { dispatch(deletePharmacy(item.id, t)) }}
                    className="btn btn-outline-danger btn-sm float-left">
                    <i className="bi-trash" />
                </button>
            </td>
        )
    }

    return (
        <>
            <List
                name="pharmacies"
                records={pharmacies}
                k="id"
                columns={['name', 'address']}
                refreshRecords={() => { dispatch(getPharmacies(t)); }}
                createRecord={() => { clearFields(); dispatch(clearMessage()); setModalAdd(true); }}
                action={action}
            />
            <ModalWindow modal={modalAdd} deactiveModal={() => setModalAdd(false)} textHeader={t("Create")}
                textButton={t("Create")} method={createRecord} message={message}
            >
                <FieldInput name="name" model={model} setModel={setModel} minLength={2}/>
                <FieldInput name="address" model={model} setModel={setModel} minLength={2}/>
            </ModalWindow>
            <ModalWindow modal={modalEdit} deactiveModal={() => setModalEdit(false)} textHeader={t("Edit")}
                method={editRecord} message={message} textButton={t("Edit")}
            >
                <FieldInput name="name" model={model} setModel={setModel} minLength={2} />
                <FieldInput name="address" model={model} setModel={setModel} minLength={2} />
            </ModalWindow>
        </>
    );
};

export default PharmaciesPage;