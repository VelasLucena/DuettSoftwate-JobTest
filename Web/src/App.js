import React from 'react';
import { useState } from "react";
import { useEffect } from "react";
import { Component } from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import iconFruit from './assets/iconFruit.png';

function App() {

    //Url's
    const getFruitsUrl = "https://localhost:7139/api/main/GetFruits";
    const createFruitsUrl = "https://localhost:7139/api/main/CreateFruit";
    const editFruitUrl = "https://localhost:7139/api/main/EditFruit";
    const deleteFruitUrl = "https://localhost:7139/api/main/DeleteFruit";
    const DivisionValuesUrl = "https://localhost:7139/api/main/DivisionValues";
    const MultiplicationValuesUrl = "https://localhost:7139/api/main/MultiplicationValues";
    const [data, setData] = useState([]);

    //Requisições para API
    const getFruits = async () => {
        await axios.get(getFruitsUrl)
            .then(response => {
                setData(response.data);
            }).catch(error => {
                console.log(error);
            })
    }
    const createFruitPost = async () => {
        delete fruitSelect.id;
        fruitSelect.valueA = parseInt(fruitSelect.valueA);
        fruitSelect.valueA = parseInt(fruitSelect.valueB);
        await axios.post(createFruitsUrl, fruitSelect)
            .then(response => {
                setData(data.concat(response.data));
                setUpdateData(true);
                openCloseModalInclude();
            }).catch(error => {
                console.log(error);
            })
    }
    const editFruitPut = async () => {
        fruitSelect.id = parseInt(fruitSelect.id);
        fruitSelect.valueA = parseInt(fruitSelect.valueA);
        fruitSelect.valueB = parseInt(fruitSelect.valueB);
        await axios.put(editFruitUrl, fruitSelect)
            .then(response => {
                var responsePut = response.data;
                var aux = data;
                aux.map(fruit => {
                    if (fruit.id === fruitSelect.id) {
                        fruit.name = responsePut.name;
                        fruit.valueA = responsePut.valueA;
                        fruit.valueA = responsePut.valueB;
                    }
                })
                openCloseModalEdit();
                setUpdateData(true);
            }).catch(error => {
                console.log(error);
            })
    }
    const deleteFruitDl = async () => {
        fruitSelect.id = parseInt(fruitSelect.id);
        await axios.delete(deleteFruitUrl + "?id=" + fruitSelect.id, fruitSelect)
            .then(response => {
                setData(data.filter(fruit => fruit.id !== response.data));
                setUpdateData(true);
                openCloseModalDelete();
            }).catch(error => {
                console.log(error);
            })
    }
    const [operationResult, setOperationResult] = useState("");
    const divisionValuesGet = async () => {
        fruitSelect.id = parseInt(fruitSelect.id);
        await axios.get(DivisionValuesUrl + "?id=" + fruitSelect.id, fruitSelect)
            .then(response => {
                setOperationResult(response.data);
            }).catch(error => {
                console.log(error);
            })
    }
    const MultiplicationValues = async () => {
        fruitSelect.id = parseInt(fruitSelect.id);
        await axios.get(MultiplicationValuesUrl + "?id=" + fruitSelect.id, fruitSelect)
            .then(response => {
                setOperationResult(response.data);
            }).catch(error => {
                console.log(error);
            })
    }



    //Atualização da tela inicial constante
    const [updateData, setUpdateData] = useState(true);
    useEffect(() => {
        if (updateData) {
            getFruits();
            divisionValuesGet();
            setUpdateData(false)
        }
    }, [updateData])

    //Selecionar Frutas para métodos
    const [fruitSelect, setFruitSelect] = useState({
        id: '',
        name: '',
        valueA: '',
        valueB: ''
    })
    const selectFruitEditOrDeleteOrCalculated = (fruit, opcao) => {
        setFruitSelect(fruit);
        if (opcao == 1) {
            openCloseModalEdit()
        } else if (opcao == 2) {
            openCloseModalDelete();
        } else {
            openCloseModalCalculated();
            setOperationResult(0);
        }

    }

    //Modal de criar Frutas
    const handleChange = e => {
        const { name, value } = e.target;
        setFruitSelect({
            ...fruitSelect, [name]: value
        });
        console.log(fruitSelect)
    }
    const [modalInclude, setModalInclude] = useState(false);
    const openCloseModalInclude = () => {
        setModalInclude(!modalInclude);
    }

    //Modal de editar frutas
    const [modalEdit, setModalEdit] = useState(false);
    const openCloseModalEdit = () => {
        setModalEdit(!modalEdit);
    }

    //modal de Excluir frutas
    const [modalDelete, setModalDelete] = useState(false);
    const openCloseModalDelete = () => {
        setModalDelete(!modalDelete);
    }

    //Modal de calcular
    const [modalCalculated, setModalCalculated] = useState(false)
    const openCloseModalCalculated = () => {
        setModalCalculated(!modalCalculated);
    }


    return (
        <div className="App">
            <br />
            <h1>Frutas <img src={iconFruit} alt="Icone" height="30" width="30"></img></h1>
            <br /> <br /> <br />
            <div className="d-grid gap-2 col-6 mx-auto">
                <button className="btn btn-success" onClick={() => openCloseModalInclude()}>Incluir Fruta</button>
            </div>
            <div className="boxTable">
                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th>Descricao</th>
                            <th>ValorA</th>
                            <th>ValorB</th>
                            <th>Configuracao</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(fruit => (
                            <tr key={fruit.id}>
                                <td>{fruit.name}</td>
                                <td>{fruit.valueA}</td>
                                <td>{fruit.valueB}</td>
                                <td className="ColumButton">
                                    <button className="btn btn-primary" onClick={() => selectFruitEditOrDeleteOrCalculated(fruit, 1)}>Editar</button> {"  "}
                                    <button className="btn btn-danger" onClick={() => selectFruitEditOrDeleteOrCalculated(fruit, 2)}>Excluir</button>
                                    <button className="btn btn-info" onClick={() => selectFruitEditOrDeleteOrCalculated(fruit, 3)}>Calcular</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal isOpen={modalInclude}>
                <ModalHeader>Incluir Frutas</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Nome: </label>
                        <br />
                        <input type="text" className="form-control" name="name" onChange={handleChange}></input>
                        <br />
                        <label>ValorA: </label>
                        <input type="number" className="form-control" name="valueA" onChange={handleChange}></input>
                        <br />
                        <label>ValorB: </label>
                        <input type="number" className="form-control" name="valueB" onChange={handleChange}></input>
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button type="button" class="btn btn-primary" onClick={() => createFruitPost()}>Confirmar</button>
                    <button type="button" class="btn btn-danger" onClick={() => openCloseModalInclude()}>Cancelar</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalEdit}>
                <ModalHeader>Editar Fruta</ModalHeader>
                <ModalBody>
                    <div className="form-group">
                        <label>Nome: </label>
                        <br />
                        <input value={fruitSelect && fruitSelect.name} type="text" className="form-control" name="name" onChange={handleChange}></input>
                        <br />
                        <label>Valor A: </label>
                        <input value={fruitSelect && fruitSelect.valueA} type="number" className="form-control" name="valueA" onChange={handleChange}></input>
                        <br />
                        <label>Valor B: </label>
                        <input value={fruitSelect && fruitSelect.valueB} type="number" className="form-control" name="valueB" onChange={handleChange}></input>
                        <br />
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button type="button" class="btn btn-primary" onClick={() => editFruitPut()}>Editar</button>
                    <button type="button" class="btn btn-danger" onClick={() => openCloseModalEdit()}>Cancelar</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalDelete}>
                <ModalBody>
                    Confirma a exclusao da fruta {fruitSelect && fruitSelect.name} ?
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={() => deleteFruitDl()}>Sim</button>
                    <button className="btn btn-secundary" onClick={() => openCloseModalDelete() }>Nao</button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalCalculated}>
                <ModalBody>
                    <div className="form-group">
                        <label>Nome: </label>
                        <br />
                        <input value={fruitSelect && fruitSelect.name} type="text" className="form-control" name="name" onChange={handleChange} readOnly></input>
                        <br />
                        <label>Valor A</label>
                        <br />
                        <input value={fruitSelect && fruitSelect.valueA} type="text" className="form-control" name="valueA" onChange={handleChange} readOnly></input>
                        <br />
                        <label>Valor B</label>
                        <br />
                        <input value={fruitSelect && fruitSelect.valueB} type="text" className="form-control" name="valueB" onChange={handleChange} readOnly></input>
                        <br />
                        <label>Resultado da Operacao: </label>
                        <br />
                        <input value={operationResult} type="text" className="form-control" name="valueB" onChange={handleChange} readOnly></input>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-warning" onClick={() => divisionValuesGet()}>Dividir</button>
                    <button className="btn btn-warning" onClick={() => MultiplicationValues()}>Multiplicar</button>
                    <button className="btn btn-danger" onClick={() => openCloseModalCalculated()}>Fechar</button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default App;
