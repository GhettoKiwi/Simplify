const mongoose = require('mongoose');

const Status = Object.freeze({
    OPEN:"OPEN", 
    PROGRESS:"IN PROGRESS",
    DONE: "DONE",
    HOLD: "ON HOLD"
});

const StatusSchema = mongoose.Schema({
    gender: {
      type: String,
      enum: Object.values(Status),
    }
  });

  Object.assign(StatusSchema.statics, {
    Status,
  });

module.exports = mongoose.model('Status', StatusSchema);