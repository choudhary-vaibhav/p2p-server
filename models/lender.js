//Collection Structure
const { SchemaTypes } = require('mongoose');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lenderSchema = new Schema({
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


const Lender = mongoose.model('lender', lenderSchema);
module.exports = Lender;