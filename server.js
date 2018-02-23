'use strict';

// Requires:
const express = require('express');

// Init:
const app = express();
app.use(express.static('public'));
app.listen(process.env.HTTP_PORT || 3000);
