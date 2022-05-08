import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Container, Row, Button, Col, Jumbotron } from "reactstrap";
import ModalWindow from '../ModalWindow/ModalWindow';
import List from '../ListComponents/List'
import { createDrug, deleteDrug, editDrug, getDrugs } from '../../actions/drug';
import { clearMessage } from '../../actions/message';
import { useTranslation } from 'react-i18next';
import { FieldInput } from '../FormComponents';

const Drug = (props) => {
    const id = props.match.params.id;

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [model, setModel] = useState({ id: "", name: "", price: 0.0, amount: 0 });

    const { address, Name, drugs, message } = useSelector(state => ({
        Name: state.drug.name,
        address: state.drug.address,
        drugs: state.drug.drugs,
        message: state.message.message
    }), shallowEqual)

    useEffect(() => {
        dispatch(getDrugs(id, t))
            .then(() => { })
            .catch(() => { props.history.push("/404") });
    }, [id, dispatch, props.history])

    const createRecord = () => {
        dispatch(createDrug(model.name, model.price, model.amount, id, t))
            .then(() => {
                setModalAdd(false);
                dispatch(clearMessage());
                clearFields();
            })
            .catch(() => { })
    }

    const clearFields = () => {
        setModel({ id: "", name: "", price: 0.0, amount: 0 });
    }

    const editRecord = () => {
        dispatch(editDrug(model.id, model.name, model.price, model.amount, t))
            .then(() => {
                setModalEdit(false);
                dispatch(clearMessage());
                clearFields();
            })
            .catch(() => { })
    }

    const getDrugValues = (item) => {
        setModel(item);
        dispatch(clearMessage());
        setModalEdit(true);
    }

    const action = (item) => {
        return (
            <td>
                <button
                    onClick={() => { getDrugValues(item) }}
                    style={{ marginRight: "3px" }}
                    className="btn btn-outline-success btn-sm float-left">
                    <i className="bi-pencil-square" />
                </button>
                <button
                    onClick={() => { dispatch(deleteDrug(item.id, t)) }}
                    className="btn btn-outline-danger btn-sm float-left">
                    <i className="bi-trash" />
                </button>
            </td>
        )
    }

    return (
        <Container>
            <Jumbotron className="bg-dark text-white">
                <Row>
                    <Col className="text-left">
                        <h3>
                            <strong>{t("name")}: {Name}</strong>
                        </h3>
                        <h3>
                            <strong>{t("address")}: {address}</strong>
                        </h3>
                    </Col>
                </Row>
            </Jumbotron>

            <List
                name="drugs"
                records={drugs}
                k="id"
                columns={['name', 'amount', 'price']}
                refreshRecords={() => {
                    dispatch(getDrugs(id, t))
                        .then(() => { })
                        .catch(() => { props.history.push("/404"); }) }}
                createRecord={() => { clearFields(); dispatch(clearMessage()); setModalAdd(true); }}
                action={action}
            />

            <ModalWindow modal={modalAdd} deactiveModal={() => setModalAdd(false)} textHeader={t("Create")}
                textButton={t("Create")} method={createRecord} message={message}
            >
                <FieldInput name="name" model={model} setModel={setModel} minLength={2} />
                <FieldInput type="number" name="amount" model={model} setModel={setModel} min={0} />
                <FieldInput type="number" name="price" model={model} setModel={setModel} min={0.0} />
            </ModalWindow>
            <ModalWindow modal={modalEdit} deactiveModal={() => setModalEdit(false)} textHeader={t("Edit")}
                method={editRecord} message={message} textButton={t("Edit")}
            >
                <FieldInput name="name" model={model} setModel={setModel} minLength={2} />
                <FieldInput type="number" name="amount" model={model} setModel={setModel} min={0} />
                <FieldInput type="number" name="price" model={model} setModel={setModel} min={0.0} />
            </ModalWindow>
        </Container>
    );
};

export default Drug;