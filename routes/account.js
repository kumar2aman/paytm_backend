const express = require("express")
const router = express.Router();
const { authMiddleware } = require('../middelware/middleware.js')
const { Account } = require('../db.js');
const { default: mongoose } = require("mongoose");

router.get('/balance', authMiddleware, async (req, res) => {

    const amount = await Account.findOne({
        userId: req.userId
    })

    res.json({
        balance: amount.balance
    })

})


router.post('/transfer', authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();


    session.startTransaction();

    const {  amount, to } = req.body;

    const account = await Account.findOne({
        userId: req.userId
    }).session(session)

    if (!account || amount > account.balance) {
        await session.abortTransaction()
        return res.status(400).json({
            massage: "Insufficient balance"
        })
    }
    const toAccount = await Account.findOne({ userId: to }).session(session)

    if (!toAccount) {
        await session.abortTransaction()
        return res.status(400).json({
            massage: "No such account"
        })
    }

    await Account.updateOne(
        { userId: req.userId },
        {
            $inc:
                { balance: -amount }
        }
    ).session(session)

    await Account.updateOne(
        { userId: to },
        {
            $inc:
                { balance: amount }
        }).session(session)



    await session.commitTransaction();
    res.json({
        massage: "transfer successfull"
    })



})





module.exports = router









