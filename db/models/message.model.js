const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  content: String,
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
 
});

const messageModel = mongoose.model('message', messageSchema);

module.exports = messageModel;