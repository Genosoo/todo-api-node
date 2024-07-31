"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const generateSecretKey = (size = 64) => {
    return (0, crypto_1.randomBytes)(size).toString('hex');
};
const secretKey = generateSecretKey();
console.log(secretKey);
