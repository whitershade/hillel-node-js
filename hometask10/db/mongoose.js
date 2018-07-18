const mongoose = require('mongoose');


mongoose.Promise = global.Promise; // Use native promises instead of mpromise
mongoose.connect(process.env.MONGODB_URI);

if (process.env.NODE_ENV === 'dev') mongoose.set('debug', true);

mongoose.connection.on('error', (err) => {
  global.console.error('MongoDB err', err);
  process.exit(0);
});

mongoose.connection.on('open', () => {
  global.console.error('MongoDB connect success');
});


module.exports = mongoose;
