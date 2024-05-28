# Acnetify API
RESTful API made with TypeScript, Express.js, and Firebase Firestore.

## Prerequisites
Node.js v20.13.1
Firebase Firestore

## Installation
```bash
npm install
```

## Usage
```bash
npm start
```

<!-- "@google-cloud/firestore": "^7.7.0",
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "envalid": "^8.0.0",
    "express": "^4.19.2",
    "express-http-context": "^1.2.4",
    "express-validator": "^7.0.1",
    "jsonwebtoken": "^9.0.2",
    "module-alias": "^2.2.3",
    "morgan": "^1.10.0",
    "multer": "^1.4.5-lts.1",
    "validator": "^13.12.0" -->

## Dependencies
---
Dependency | Usage
--- | ---
@google-cloud/firestore | Client to interact with Firestore
bcrypt | Hashing and salting passwords
cors | CORS handling
dotenv | Environment variables loader
envalid | Environment variables validation
express | Backend library
express-http-context | Pass data across asynchronous calls in a same request lifecycle
express-validator | Request input sanitization and validation
jsonwebtoken | Create and verify JSON Web Tokens
module-alias | Custom module paths for cleaner imports
morgan | HTTP request logger
multer | Middleware to handle `multipart/form-data`