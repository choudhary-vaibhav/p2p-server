const userServices = require('../services/userServices');

async function createUser(req, res){
    try{
        const type = req.body.type ? req.body.type : null;
        const account = req.body.account ? req.body.account : null;
        const wallet = req.body.wallet ? req.body.wallet : 0;

        if(!type || !account){
            return res.status(404).json({ error: "Missing fields in request body." });
        }

        let result;

        if(type == 'borrower'){
            result = await userServices.createBorrower(account, wallet);
        }else{
            result = await userServices.createLender(account, wallet);
        }

        if(!result){
            return res.status(404).json({ error: "There is some problem!" });
        }

        return res.status(201).json({
            id:result
        });

    }catch(err){
        return res.status(400).json({ error: err.message });
    }
}

async function createLoan(req, res){
    try{
        const amount = req.body.amount ? req.body.amount : null;
        const dueDate = req.body.dueDate ? req.body.dueDate : null;
        const mortgage = req.body.mortgage ? req.body.mortgage : null;
        const interest = req.body.interest ? req.body.interest : null;
        const borrower_acc = req.body.borrower_acc ? req.body.borrower_acc : null;

        if(!amount || !dueDate || !mortgage || !interest || !borrower_acc){
            return res.status(404).json({ error: "Missing fields in request body." });
        }

        const loanID = await userServices.createLoan(amount, dueDate, mortgage, interest, borrower_acc);

        if(loanID){
            return res.status(201).json({
                loanID: loanID,
            });
        }

        return res.status(400).json({ error: "There is some problem!" });

    }catch(err){
        return res.status(400).json({ error: err.message });
    }
}

async function approveLoan(req, res){
    try{
        const loanID = req.body.loanID ? req.body.loanID : null;
        const amount = req.body.amount ? req.body.amount : null;
        const borrower_acc = req.body.borrower_acc ? req.body.borrower_acc : null;
        const lender_acc = req.body.lender_acc ? req.body.lender_acc : null;

        if(!loanID || !amount || !lender_acc || !borrower_acc){
            return res.status(404).json({ error: "Missing fields in request body." });
        }

        let result;

        const isLoanApproved = await userServices.approveLoan(loanID, lender_acc);
        if(isLoanApproved){
            isAppendBorrower = await userServices.appendLoanBorrower(borrower_acc, loanID, amount);

            if(isAppendBorrower){
                result = await userServices.appendLoanLender(lender_acc, loanID, amount);
            }
        }

        if(result){
            return res.status(200).json({
             message: 'Successfully approved!',  
            });
        }

        return res.status(400).json({ error: "There is some problem!" });
    }catch(err){
        return res.status(400).json({ error: err.message });
    }
}

async function getLoanDataAll(req, res){
    try{
        const result = await userServices.getLoanDataAll();

        if(result){
            return res.status(200).json(result);
        }

        return res.status(400).json({ error: "There is some problem!" });
    }catch(err){
        return res.status(400).json({ error: err.message });
    }
}

module.exports = {
    createUser,
    createLoan,
    approveLoan,
    getLoanDataAll,

}