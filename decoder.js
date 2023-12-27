const jwt = require('jsonwebtoken');

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjMsImZpcnN0bmFtZSI6ImFiaWdhZWwiLCJsYXN0bmFtZSI6Indhc2FiaSIsImVtYWlsIjoiYWJpd2FzYWJpMDNAZ21haWwuY29tIiwiaWF0IjoxNzAzMjMxMzIyLCJleHAiOjE3MDMyNDkzMjJ9.We5RklPyftpdnIr17addscrxROYvAJvkFj7otB3boSo";
 

const decoded = jwt.decode(token);

console.log(decoded);
