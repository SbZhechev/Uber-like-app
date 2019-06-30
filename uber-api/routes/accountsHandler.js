const router = require('express').Router();
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const indicative = require('indicative');

router.use(bodyParser.json({limit: '20mb'}));

router.get('/', (req, res) => {
    const dataBase = req.app.locals.db;
    dataBase.collection('Accounts').find().toArray()
        .then(accounts => {
            if(accounts.length > 0){
                res.json(accounts);
            } else {
                res.send('No data');
            };
        })
        .catch(err => {
            throw err;
        });
});

router.post('/', (req, res) => {
    const newUser = req.body;
    const dataBase = req.app.locals.db;
    indicative.validate(newUser, 
        {
            name: 'required|string',
            username: 'required|string|max:15',
            password: 'required|string|min:8',
            gender: 'string',
            accountType: 'string',
            picture: 'url',
            bio: 'string|max:512',
            accountStatus: 'string',
        })
        .then(newUser => {
            newUser.registrationDate = require('../addDate.js')();
            newUser.lastModified = require('../addDate.js')();
            dataBase.collection('Accounts').insertOne(newUser)
            .then(result => {
                    if(result.result.ok && result.insertedCount === 1){
                        const uri = req.baseUrl + '/' + newUser._id;
                        res.status(201);
                        res.location(uri);
                        res.json(newUser);
                    };
            })
            .catch(err =>{
                    res.status(500);
                    res.json(err.message);
                    throw err;
            });
        }).catch(errors => {
                res.status(400);
                res.json(errors);
        });
});

router.get('/getUser/:username/:password', (req, res) => {
    const dataBase = req.app.locals.db;
    var username = req.params.username;
    var password = req.params.password;
    dataBase.collection('Accounts').findOne({username:username, password})
        .then(user => {
            if(user){
                res.status(200);
                res.json(user);
            }
            else {
                res.status(500);
                res.json('No such record');
            };
        });
});

router.get('/:accountId', (req, res) => {
    const dataBase = req.app.locals.db;
    var searchId = new mongodb.ObjectID(req.params.accountId);
    dataBase.collection('Accounts').findOne({_id:searchId})
        .then(user => {
            if(user){
                res.status(200);
                res.json(user);
            }
            else {
                res.status(500);
                res.json('No such record');
            };
        });
});


router.put('/:accountId', (req, res) => {
    const dataBase = req.app.locals.db;
    const updatedUser = req.body;
    var searchId = new mongodb.ObjectID(req.params.accountId);
    indicative.validate(updatedUser,
        {
            name: 'required|string',
            username: 'required|string|max:15',
            password: 'required|string|min:8',
            gender: 'string',
            accountType: 'required|string',
            picture: 'required|url',
            bio: 'string|max:512',
            accountStatus: 'required|string',
            registrationDate: 'date',
            lastModified: 'date'
        })
        .then(updatedUser => {
            const newValues = { $set:{ ...updatedUser, lastModified: require('../addDate.js')() } }
            dataBase.collection('Accounts').updateOne({_id:searchId}, newValues, (err, result) => {
                    if(result.result.ok && result.n !== 0){
                        res.status(200);
                        res.json(updatedUser);
                    } else {
                        res.status(500);
                        res.json('No such record');
                    };
                });
            })
            .catch(errors => {
                res.status(400);
                console.log(errors);
                res.json(errors);
            });
});

router.delete('/:accountId', (req, res) => {
    const dataBase = req.app.locals.db;
    const searchId = new mongodb.ObjectID(req.params.accountId);
    dataBase.collection('Accounts').deleteOne({_id: searchId})
    .then(result => {
        if(result.result.ok && result.result.n === 1){
            res.status(204);
            res.json(result);
        }
        else {
            res.status(500);
            res.json('No such record.');
        };
    })
    .catch(err => {
        res.status(400);
        throw err;
    });
});

module.exports = router;