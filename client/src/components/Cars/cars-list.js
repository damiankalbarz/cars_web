/*
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Car = props => (
    <tr>
        <td>{props.car.marka}</td>
        <td>{props.car.model}</td>
        <td>{props.car.rocznik}</td>
        <td>{props.car.przebieg}</td>
        <td>
            <Link to={"/edit/" + props.car._id}>edit</Link> | <a href="#" onClick={() => { props.deleteCar(props.car._id) }}>delete</a>
        </td>
    </tr>
)

const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.reload()
}



export default class CarsList extends Component {
    constructor(props) {
        super(props);

        this.deleteCar = this.deleteCar.bind(this)

        this.state = { cars: [] };
    }

    

    componentDidMount() {
        axios.get('http://localhost:8080/api/cars/')
            .then(response => {
                this.setState({ cars: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteCar(id) {
        axios.delete('http://localhost:8080/api/cars/' + id)
            .then(response => { console.log(response.data) });

        this.setState({
            cars: this.state.cars.filter(el => el._id !== id)
        })
    }

    carsList() {
       
        if (this.state.cars) {
            return this.state.cars.map(currentcar => {
                return <Car car={currentcar} deleteCar={this.deleteCar} key={currentcar._id} />;
            });
        } else {
            return null;
        }
    }
    

    render() {
        return (
            <div className="container-dark">
                <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                    <Link to="/" className="navbar-brand">AutoPlac</Link>
                    <div className="collapse navbar-collapse justify-content-end">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/create" className="nav-link">Dodaj auto</Link>
                            </li>
                        </ul>
                        <Link onClick={handleLogout} className="btn btn-outline-light" to="#">Wyloguj</Link>
                    </div>
                </nav>
                <div className="d-flex justify-content-center">
                    <div className="text-center w-100">
                        <h3 className="mt-5">Auta na stanie</h3>
                        <table className="table table-striped mt-4">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Marka</th>
                                    <th scope="col">Model</th>
                                    <th scope="col">Rocznik</th>
                                    <th scope="col">Przebieg</th>
                                    <th scope="col">Akcje</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.carsList()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}
*/

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Car = props => (
    <tr>
        <td>{props.car.marka}</td>
        <td>{props.car.model}</td>
        <td>{props.car.rocznik}</td>
        <td>{props.car.przebieg}</td>
        <td>
            <Link to={"/edit/" + props.car._id}>edit</Link> | <a href="#" onClick={() => { props.deleteCar(props.car._id) }}>delete</a>
        </td>
    </tr>
)

const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.reload()
}



export default class CarsList extends Component {
    constructor(props) {
        super(props);

        this.deleteCar = this.deleteCar.bind(this)

        this.state = { cars: [] };
    }



    componentDidMount() {
        axios.get('http://localhost:8080/api/cars/', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
            .then(response => {
                this.setState({ cars: response.data })
            })
            .catch((error) => {
                window.location.replace('/login');
                console.log(error);
            })
    }

    deleteCar(id) {
        axios.delete('http://localhost:8080/api/cars/' + id, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
            .then(response => { console.log(response.data) });

        this.setState({
            cars: this.state.cars.filter(el => el._id !== id)
        })
    }

    carsList() {

        if (this.state.cars) {
            return this.state.cars.map(currentcar => {
                return <Car car={currentcar} deleteCar={this.deleteCar} key={currentcar._id} />;
            });
        } else {
            return null;
        }
    }


    render() {
        return (
            <div className="container-dark">
                <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                    <Link to="/" className="navbar-brand">AutoPlac</Link>
                    <div className="collapse navbar-collapse justify-content-end">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/create" className="nav-link">Dodaj auto</Link>
                            </li>
                        </ul>
                        <Link onClick={handleLogout} className="btn btn-outline-light" to="#">Wyloguj</Link>
                    </div>
                </nav>
                <div className="d-flex justify-content-center">
                    <div className="text-center w-100">
                        <h3 className="mt-5">Auta na stanie</h3>
                        <table className="table table-striped mt-4">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Marka</th>
                                    <th scope="col">Model</th>
                                    <th scope="col">Rocznik</th>
                                    <th scope="col">Przebieg</th>
                                    <th scope="col">Akcje</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.carsList()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}