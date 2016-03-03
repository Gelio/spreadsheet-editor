var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/spreadsheeter';

var options = {
    auto_reconnect: true,
    server: {
        socketOptions: {
            keepAlive: 1
        }
    }
};


// Make it ES6 if it works
var DBConnector = {
    connected: false,
    connectionPending: false,
    connectionPromise: null,
    connectionError: null,
    database: null,
    connect: DBConnect,
    fetchTasks: fetchTasks,
    updateTask: updateTask
};



function DBConnect() {
    if(this.connected || this.connectionPending)
        return this.connectionPromise;
    else {
        this.connectionPending = true;
        this.connectionError = null;

        this.connectionPromise = new Promise((resolve, reject) => {
            MongoClient.connect(url, options, (err, db) => {
                this.connectionPending = false;
                if(err) {
                    this.connectionError = err;
                    return reject(err);
                }

                this.connected = true;
                this.database = db;
                resolve(this);
            });
        });

        return this.connectionPromise;
    }
}

function fetchTasks() {
    if(!this.connected)
        return Promise.reject('A connection has to be made prior to fetching the tasks.');

    return new Promise((resolve, reject) => {
        var tasksCollection = this.database.collection('tasks');

        tasksCollection.find({}).toArray((err, docs) => {
            if (err)
                return reject(err);

            resolve(docs);
            // TODO: return proper Task class objects
        });
    });
}

function updateTask(updatedTask) {
    // TODO: finish this
}

module.exports = DBConnector;