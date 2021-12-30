const express = require('express');
const db = require('./config/connection');
// const { MongoClient: mongodb, ObjectId } = require('mongodb');
// const connectionStringURI = `mongodb://localhost:27017/noSqlSocialDB`;

const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/noSqlSocialDB', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));

app.listen(PORT, () => {
console.log(`API server running on port ${PORT}!`);
});
