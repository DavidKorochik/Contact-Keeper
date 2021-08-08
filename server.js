const express = require('express');
require('dotenv').config();
const app = express();
const connectToDB = require('./db/mongoose');

app.use(express.json());

app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacs'));
app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.PORT, () => {
  connectToDB();
  console.log(`App is running on port ${process.env.PORT}`);
});
