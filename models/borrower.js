//Collection Structure
const { SchemaTypes } = require('mongoose');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const borrowerSchema = new Schema({
    'account':  {
        type: SchemaTypes.String,
        required: true,
        trim: true,
    },
    'wallet': {
        type: SchemaTypes.Number,
        min: 0,
        required: true,
    },
    'loans': {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        default: [],
    },
});


const Borrower = mongoose.model('borrower', borrowerSchema);
module.exports = Borrower;