const { Firestore } = require('@google-cloud/firestore');

const dbConfig = {
    projectId: 'capstone-acnetify',
    keyFilename: 'keyfile.json',
};

const db = new Firestore(dbConfig);

module.exports = db;
