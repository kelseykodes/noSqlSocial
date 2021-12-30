const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
// const { MongoClient: mongodb, ObjectId } = require('mongodb');
// const connectionStringURI = `mongodb://localhost:27017/noSqlSocialDB`;

const mongoose = require('mongoose');

const PORT = process.env.PORT || 3001;
const app = express();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/noSqlSocialDB', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
// app.use(require('./routes'));

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
