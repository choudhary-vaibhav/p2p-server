//Collection Structure
const { SchemaTypes } = require('mongoose');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const loanSchema = new Schema({
    'amount': {
        type: SchemaTypes.Number,
        min: 0,
        required: true,
    },
    'dueDate': {
        type: SchemaTypes.String,
        required: true,
        trim: true,
    },
    'mortgage': {
        type: SchemaTypes.String,
        required: true,
        trim: true,
    },
    'interest': {
        type: SchemaTypes.Number,
        min: 0,
        required: true,
    },
    'borrower_acc': {
        type: SchemaTypes.String,
        required: true,
        trim: true,
    },
    'lender_acc': {
        type: SchemaTypes.String,
        trim: true,
        default: 'N/A',
    },
    'is_paid': {
        type: SchemaTypes.Boolean,
        default: false,
    }
});

const Loan = mongoose.model('loan', loanSchema);
module.exports = Loan;