const express = require('express');
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;
const cors = require('cors');

const app = express();
const PORT = 9000 || process.env.PORT;
const mongUrl = 'mongodb://localhost:27017/Uber';


app.use(cors());
app.use(bodyParser.json({limit: '20mb'}));

const accountsHandler = require('./routes/accountsHandler.js')
app.use('/api/accounts', accountsHandler);

const requestsHandler = require('./routes/requestsHandler.js');
app.use('/api/requests',requestsHandler);

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.use((req,res,next) => {
    res.status(404);
    const err = new Error('Page not found');
    next(err);
});

app.use((err, req, res) => {
    res.send(err);
    throw err;
});

mongoClient.connect(mongUrl, {useNewUrlParser: true})
    .then(db => {
        app.locals.db = db.db('Uber');
        app.listen(PORT, err => {
            if(err) throw err;
            console.log(`App listening on port: ${PORT}`);
        });
    })
    .catch(err => {
        throw err;
    });