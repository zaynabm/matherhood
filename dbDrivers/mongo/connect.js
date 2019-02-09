var mongoose=require("mongoose");
mongoose.Promise = require('bluebird');

var uri='mongodb://user1:userpass@cluster0-shard-00-00-6ytib.mongodb.net:27017,cluster0-shard-00-01-6ytib.mongodb.net:27017,cluster0-shard-00-02-6ytib.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true'
mongoose.connect(uri)
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Connected to MongoDB database")
});

exports.connect=db
