var mongoose = require('mongoose');

var ButtonSchema = new mongoose.Schema({
    name: String,
    publicButton: { type: Boolean, default: false },
    soundFile: { type: String, default: "nothing" },
    color: String,
    likes: { type: Number, default: 0 }
});


ButtonSchema.pre('remove', function (next) {
    this.model('User').update({}, { $pull: { buttons: this._id } }, { safe: true, multi: true }, next);
});

mongoose.model('Button', ButtonSchema); 