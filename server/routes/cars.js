const router = require('express').Router();
let Car = require('../models/car');
const Joi = require('joi');
const jwt = require('jsonwebtoken');


const carSchema = Joi.object({
    marka: Joi.string().required(),
    model: Joi.string().required(),
    rocznik: Joi.number().integer().required(),
    przebieg: Joi.string().required()
});

const tokenVerification = (req, res, next) => {
    //pobranie tokenu z nag³ówka:
    let token = req.headers["x-access-token"];
    if (!token) {
        res.status(403).send({ message: "No token provided!" });
    }
    //jeœli przes³ano token - weryfikacja jego poprawnoœci:
    jwt.verify(token, process.env.JWTPRIVATEKEY, (err, decodeduser) => {
        if (err) {
            console.log("Unauthorized!")
            res.status(401).send({ message: "Unauthorized!" });
        }
        console.log("Token poprawny, u¿ytkownik: " + decodeduser._id)
        req.user = decodeduser
        next()
    })
}


router.route('/').get(tokenVerification, (req, res) => { 
            Car.find()
                .then(cars => res.json(cars))
                .catch(err => res.status(400).json('Error: ' + err));
     
});



router.route('/add').post(tokenVerification, (req, res) => {
    const { error, value } = carSchema.validate(req.body);

    if (error) {
        res.status(400).json('Validation error: ' + error.details[0].message);
        return;
    }
    const { marka, model, rocznik, przebieg } = value;

    const newCar = new Car({
        marka,
        model,
        rocznik,
        przebieg
    });

    newCar.save()
        .then(() => res.json('Car added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});



router.route('/:id').get(tokenVerification, (req, res) => {
    Car.findById(req.params.id)
        .then(car => res.json(car))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete(tokenVerification, (req, res) => {
    Car.findByIdAndDelete(req.params.id)
        .then(() => res.json('Car deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post(tokenVerification, (req, res) => {
    Car.findById(req.params.id)
        .then(car => {
            car.marka = req.body.marka;
            car.model = req.body.model;
            car.rocznik = req.body.rocznik;
            car.przebieg = req.body.przebieg;

            car.save()
                .then(() => res.json('Car updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;