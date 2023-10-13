import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.reload()
}


export default class CreateCar extends Component {
    constructor(props) {
        super(props);
        this.onChangeMarka = this.onChangeMarka.bind(this);
        this.onChangeModel = this.onChangeModel.bind(this);
        this.onChangeRocznik = this.onChangeRocznik.bind(this);
        this.onChangePrzebieg = this.onChangePrzebieg.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            marka: '',
            model: '',
            rocznik: '',
            przebieg: ''
        }
    }
   
    onChangeMarka(e) {
        this.setState({
            marka: e.target.value
        })
    }

    onChangeModel(e) {
        this.setState({
            model: e.target.value
        })
    }

    onChangeRocznik(e) {
        this.setState({
            rocznik: e.target.value
        })
    }

    onChangePrzebieg(e) {
        this.setState({
            przebieg: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const car = {
            marka: this.state.marka,
            model: this.state.model,
            rocznik: this.state.rocznik,
            przebieg: this.state.przebieg
        }

        console.log(car);

        axios.post('http://localhost:8080/api/cars/add', car,{
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
            .then(res => console.log(res.data));

        window.location = '/';
    }
    
    
    render() {
        return (
            <div className=" container-dark">
                <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                    <Link to="/" className="navbar-brand">AutoPlac</Link>
                    <div className="collapse navbar-collapse justify-content-end">
                        
                        <Link onClick={handleLogout} className="btn btn-outline-light" to="#">Wyloguj</Link>
                    </div>
                </nav>
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <div className="card p-4">
                            <h3 className="text-center mb-4">Dodaj nowy auto</h3>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label>Marka:</label>
                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        value={this.state.marka}
                                        onChange={this.onChangeMarka}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Model:</label>
                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        value={this.state.model}
                                        onChange={this.onChangeModel}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Rocznik:</label>
                                    <input
                                        type="text"
                                        pattern="[0-9]*" title="Podaj tylko cyfry"
                                        className="form-control"
                                        value={this.state.rocznik}
                                        onChange={this.onChangeRocznik}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Przebieg:</label>
                                    <input
                                        type="text"
                                        pattern="[0-9]*" title="Podaj tylko cyfry"
                                        className="form-control"
                                        value={this.state.przebieg}
                                        onChange={this.onChangePrzebieg}
                                    />
                                </div>
                                <div className="text-center">
                                    <br />
                                    <input type="submit" value="Dodaj auto" className="btn btn-primary" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }






}