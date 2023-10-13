import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const EditCar = () => {
    const { id } = useParams();

    const [marka, setMarka] = useState('');
    const [model, setModel] = useState('');
    const [rocznik, setRocznik] = useState('');
    const [przebieg, setPrzebieg] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/api/cars/' + id, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
            .then(response => {
                const { marka, model, rocznik, przebieg } = response.data;
                setMarka(marka);
                setModel(model);
                setRocznik(rocznik);
                setPrzebieg(przebieg);
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    const handleSubmit = e => {
        e.preventDefault();

        const car = {
            marka,
            model,
            rocznik,
            przebieg
        };

        console.log(car);

        axios.post('http://localhost:8080/api/cars/update/' + id, car, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
            .then(res => console.log(res.data));

        window.location = '/';
    };

    

    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }
   
    return (
        <div className=" container-dark">
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg navbar-expand-md">
                <Link to="/" className="navbar-brand">AutoPlac</Link>
                <div className="collapse navbar-collapse justify-content-end">
                    <Link onClick={handleLogout} className="btn btn-outline-light" to="/">Wyloguj</Link>
                </div>
            </nav>
            <div className="row justify-content-center">
               
                <div className="col-md-6">
                    <h3 className="text-center mb-4">Edytuj dane samochodu</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Marka:</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                value={marka}
                                onChange={e => setMarka(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Model:</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                value={model}
                                onChange={e => setModel(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Rocznik:</label>
                            <input
                                type="text"
                                pattern="[0-9]*"
                                title="Podaj tylko cyfry"
                                className="form-control"
                                value={rocznik}
                                onChange={e => setRocznik(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Przebieg:</label>
                            <input
                                type="text"
                                pattern="[0-9]*"
                                title="Podaj tylko cyfry"
                                className="form-control"
                                value={przebieg}
                                onChange={e => setPrzebieg(e.target.value)}
                            />
                        </div>
                        <div className="form-group text-center">
                            <br />
                            <input type="submit" value="Edytuj auto" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );


};

export default EditCar;