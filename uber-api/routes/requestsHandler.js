const router = require('express').Router();
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
//const indicative = require('indicative');

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
    newRequest.userPic = 'https://source.unsplash.com/random';
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

module.exports = router;