const { Storage } = require('@google-cloud/storage');

// Menginisialisasi instance storage
const storage = new Storage({
  projectId: 'capstone-acnetify',
  keyFilename: 'keyfile.json'
});

// Memilih bucket yang akan digunakan
const bucket = storage.bucket('image-capstone-acnetify');

module.exports = { storage, bucket };
