const mongoClient = require('mongodb').MongoClient;
const mongoUrl = 'mongodb://localhost:27017/Uber';


mongoClient.connect(mongoUrl, {useNewUrlParser: true})
    .then(db => {
        db.db('Uber').createCollection('Accounts', err => {
            if(err) throw err;
            console.log('Collection created: Accounts');
            db.close();
        });
        db.db('Uber').createCollection('Requests', err => {
            if(err) throw err;
            console.log('Collection created: Requests');
            db.close();
        });
        db.db('Uber').createCollection('Drivers', err => {
            if(err) throw err;
            console.log('Collection created: Drivers');
            db.close();
        });
        db.db('Uber').createCollection('Reports', err => {
            if(err) throw err;
            console.log('Collection created: Reports');
            db.close();
        });
    })
    .catch(err => {
        throw err;
    });