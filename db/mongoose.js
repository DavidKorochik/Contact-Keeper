require('dotenv').config();
const mongosoe = require('mongoose');

module.exports = connectToDB = () => {
  mongosoe.connect(
    process.env.MONGO_URI,
    {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => console.log('Connected to DB')
  );
};
