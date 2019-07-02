const router = require('express').Router();
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const indicative = require('indicative');

router.use(bodyParser.json({limit: '20mb'}));

router.get('/', (req, res) => {
    const dataBase = req.app.locals.db;
    dataBase.collection('Requests').find().toArray().then(requests => {
        if(requests.length > 0){
            res.json(requests);
        } else {
            res.json('No data');
        };
    });
});


router.post('/:userId', (req, res) => {
    const dataBase = req.app.locals.db;
    const newRequest = req.body;
    newRequest.postedBy = mongodb.ObjectID(req.params.userId);
    dataBase.collection('Requests').insertOne(newRequest).then(result => {
        if(result.result.ok && result.insertedCount === 1){
            const uri = req.baseUrl + req.url + '/' + newRequest._id;
            res.status(201);
            res.location(uri);
            res.json(newRequest);
        } else {
            res.status(500);
            res.json('Server error');
        };
    });
})


router.post('/:userId/:userPic', (req, res) => {
    const dataBase = req.app.locals.db;
    const newRequest = req.body;
    newRequest.postedBy = req.params.userId;
    newRequest.userPic = req.params.userPic;
    newRequest.user = req.params.userName;
    console.log(req.params);
    dataBase.collection('Requests').insertOne(newRequest).then(result => {
        if(result.result.ok && result.insertedCount === 1){
            const uri = req.baseUrl + req.url + '/' + newRequest._id;
            res.status(201);
            res.location(uri);
            res.json(newRequest);
        } else {
            res.status(500);
            res.json('Server error');
        };
    });
});

router.put('/:requestId', (req, res) => {
    const dataBase = req.app.locals.db;
    const updatedRequest = req.body;
    var searchId = new mongodb.ObjectID(req.params.requestId);
    indicative.validate(updatedRequest,
        {
            name: 'string',
            username: 'string|max:15',
            password: 'string|min:8',
            gender: 'string',
            accountType: 'string',
            picture: 'url',
            description: 'string|max:512',
            accountStatus: 'string',
            registrationDate: 'string',
            lastModified: 'string'
        })
        .then(updatedRequest => {
            const newValues = { $set:{ ...updatedRequest, lastModified: require('../addDate.js')() } }
            dataBase.collection('Accounts').updateOne({_id:searchId}, newValues, (err, result) => {
                    if(result.result.ok && result.n !== 0){
                        res.status(200);
                        res.json(updatedRequest);
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


router.delete('/:requestId', (req, res) => {
    const dataBase = req.app.locals.db;
    const searchId = new mongodb.ObjectID(req.params.requestId);
    dataBase.collection('Requests').deleteOne({_id: searchId})
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