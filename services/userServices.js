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
        await borrower.save();
        return borrower._id;
    }
    return null;
}

async function createLender(account, wallet){
    const obj = {
        'account': account,
        'wallet': wallet
    };

    const lender = new Lender(obj);
    const exists = await Lender.exists({
        'account': account
    });

    if(!exists){
        await lender.save();
        return lender._id;
    }
    return null;
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

async function approveLoan(loanID, lender_acc){
    const doc = await Loan.updateOne({
        _id: loanID
    },
    {
        $set: {
            lender_acc: lender_acc,
        }
    });

    if(doc){
        return true;
    }

    return false;
}

async function appendLoanBorrower(borrowerAcc, loanID, amount){
    const doc = await Borrower.updateOne({
        account: borrowerAcc,
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

async function appendLoanLender(lenderAcc, loanID, amount){
    const doc = await Lender.updateOne({
        account: lenderAcc,
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

async function getLoanDataAll(){
    const doc = await Loan.find({
        
    });

    if(doc){
        return doc;
    }
    return null;
}

async function getWalletBorrower(borrower_acc){
    const doc = await Borrower.findOne({
        account: borrower_acc
    });

    if(doc){
        return doc.wallet;
    }

    return null;
}

async function getWalletLender(lender_acc){
    const doc = await Lender.findOne({
        account: lender_acc
    });

    if(doc){
        return doc.wallet;
    }

    return null;
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
    getLoanDataAll,
    getWalletBorrower,
    getWalletLender,
    
}