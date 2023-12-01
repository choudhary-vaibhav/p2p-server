const Borrower = require('../models/borrower');
const Lender = require('../models/lender');
const Loan = require('../models/loan');

async function createBorrower(account, wallet){
    const obj = {
        'account': account,
        'wallet': wallet
    };

    const borrower = new Borrower(obj);
    const exists = await Borrower.exists({
        'account': account
    });

    if(!exists){
        await Borrower.save();
        return res.status(201).json({
        message:'Borrower successfully registered!',
        _id: borrower._id,
        });
    }
    return res.status(403).json({ message:'Borrower Already Exists! '});
}

async function createLender(account, wallet){
    const obj = {
        'account': account,
        'wallet': wallet
    };

    const lender = new Borrower(obj);
    const exists = await Lender.exists({
        'account': account
    });

    if(!exists){
        await Lender.save();
        return res.status(201).json({
        message:'Lender successfully registered!',
        _id: lender._id,
        });
    }
    return res.status(403).json({ message:'Lender Already Exists! '});
}

async function createLoan(amount, dueDate, mortgage, interest, borrower_acc){
    const obj = {
        'amount': amount,
        'dueDate': dueDate,
        'mortgage': mortgage,
        'interest': interest,
        'borrower_acc': borrower_acc,
    };

    const loan = new Loan(obj);
    const result = await loan.save();

    if(result){
        return loan._id;
    }

    return null;
}

async function approveLoan(loanID, borrower_acc){
    const doc = await Loan.updateOne({
        _id: loanID
    },
    {
        $set: {
            borrower_acc: borrower_acc,
        }
    });

    if(doc){
        return true;
    }

    return false;
}

async function appendLoanBorrower(borrowerID, loanID, amount){
    const doc = await Borrower.updateOne({
        _id: borrowerID
    },
    {
        $push: {
            loans: loanID
        },
        $inc: {
            wallet: amount
        }
    });

    if(doc){
        return true;
    }

    return false;    
}

async function appendLoanLender(lenderID, loanID, amount){
    const doc = await Lender.updateOne({
        _id: lenderID
    },
    {
        $push: {
            loans: loanID
        },
        $inc: {
            wallet: -amount
        }
    });

    if(doc){
        return true;
    }

    return false;    
}

async function payLoan(loanID){
    const doc = await Loan.updateOne({
        _id: loanID
    },
    {
        $set: {
            is_paid: true,
        }
    });

    if(doc){
        return true;
    }

    return false;    
}

async function minusLoanBorrower(borrowerID, amount){
    const doc = await Borrower.updateOne({
        _id: borrowerID
    },
    {
        $inc: {
            wallet: -amount
        }
    });

    if(doc){
        return true;
    }

    return false; 
}

async function plusLoanLender(lenderID, amount){
    const doc = await Lender.updateOne({
        _id: lenderID
    },
    {
        $inc: {
            wallet: amount
        }
    });

    if(doc){
        return true;
    }

    return false;    
}



module.exports = {
    createBorrower,
    createLender,
    createLoan,
    approveLoan,
    appendLoanBorrower,
    appendLoanLender,
    payLoan,
    minusLoanBorrower,
    plusLoanLender,
}