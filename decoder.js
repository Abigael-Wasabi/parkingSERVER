const jwt = require('jsonwebtoken');

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsImZpcnN0bmFtZSI6IkFiaWdhZWwiLCJsYXN0bmFtZSI6Indhc2FiaSIsImVtYWlsIjoiYWJpd2FzYWJpMDNAZ21haWwuY29tIiwiaWF0IjoxNzAyMjg3MzUxLCJleHAiOjE3MDIyOTA5NTF9.1BeYvWFcv7gt-UBkjIGRJ0FHg83JlRedTRa6O7pUPgY";
 

const decoded = jwt.decode(token);

console.log(decoded);
