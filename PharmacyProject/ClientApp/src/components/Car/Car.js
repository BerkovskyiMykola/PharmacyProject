import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Jumbotron } from "reactstrap";
import ModalWindow from '../ModalWindow/ModalWindow';
import List from '../ListComponents/List'
import { createCar, deleteCar, editCar, getCars } from '../../actions/car';
import { clearMessage } from '../../actions/message';
import { useTranslation } from 'react-i18next';
import { FieldInput, SelectInput } from '../FormComponents';

const Car = (props) => {
    const id = props.match.params.id;

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [modalAdd, setModalAdd] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [model, setModel] = useState({ id: "", number: "", amountPlaces: 0, state: "" });

    const [carState] = useState([
        { id: 0, name: "Awaliable" },
        { id: 1, name: "In Use" },
        { id: 2, name: "Maintenance" }
    ]);

    const getCarState = (role) => {
        switch (role) {
            case 0:
                return "Awaliable";
            case 1:
                return "In Use";
            case 2:
                return "Maintenance";
            default:
                return undefined;
        }
    }

    const { address, Name, cars, message } = useSelector(state => ({
        Name: state.car.name,
        address: state.car.address,
        cars: state.car.cars,
        message: state.message.message
    }), shallowEqual)

    useEffect(() => {
        dispatch(getCars(id, t))
            .then(() => { })
            .catch(() => { props.history.push("/404") });
    }, [id, dispatch, props.history])

    const createRecord = () => {
        dispatch(createCar(model.number, model.amountPlaces, parseInt(model.state), id, t))
            .then(() => {
                setModalAdd(false);
                dispatch(clearMessage());
                clearFields();
            })
            .catch(() => { })
    }

    const clearFields = () => {
        setModel({ id: "", number: "", amountPlaces: 0, state: "" });
    }

    const editRecord = () => {
        dispatch(editCar(model.id, model.number, model.amountPlaces, parseInt(model.state), t))
            .then(() => {
                setModalEdit(false);
                dispatch(clearMessage());
                clearFields();
            })
            .catch(() => { })
    }

    const getItemValues = (item) => {
        setModel(item);
        dispatch(clearMessage());
        setModalEdit(true);
    }

    const action = (item) => {
        return (
            <td>
                <button
                    onClick={() => { getItemValues(item) }}
                    style={{ marginRight: "3px" }}
                    className="btn btn-outline-success btn-sm float-left">
                    <i className="bi-pencil-square" />
                </button>
                <button
                    onClick={() => { dispatch(deleteCar(item.id, t)) }}
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
                name="cars"
                records={cars.map(x => ({ ...x, carStateName: getCarState(x.state) }))}
                k="id"
                columns={['number', 'amountPlaces', 'carStateName']}
                refreshRecords={() => {
                    dispatch(getCars(id, t))
                        .then(() => { })
                        .catch(() => { props.history.push("/404"); }) }}
                createRecord={() => { clearFields(); dispatch(clearMessage()); setModalAdd(true); }}
                action={action}
            />

            <ModalWindow modal={modalAdd} deactiveModal={() => setModalAdd(false)} textHeader={t("Create")}
                textButton={t("Create")} method={createRecord} message={message}
            >
                <FieldInput name="number" model={model} setModel={setModel} />
                <FieldInput type="number" name="amountPlaces" model={model} setModel={setModel} min={0} />
                <SelectInput labelName="carStateName" name="state" id="id" value="name" records={carState} model={model} setModel={setModel} />
            </ModalWindow>
            <ModalWindow modal={modalEdit} deactiveModal={() => setModalEdit(false)} textHeader={t("Edit")}
                method={editRecord} message={message} textButton={t("Edit")}
            >
                <FieldInput name="number" model={model} setModel={setModel} />
                <FieldInput type="number" name="amountPlaces" model={model} setModel={setModel} min={0} />
                <SelectInput labelName="carStateName" name="state" id="id" value="name" records={carState} model={model} setModel={setModel} />
            </ModalWindow>
        </Container>
    );
};

export default Car;