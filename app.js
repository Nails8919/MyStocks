import express from 'express'
import { PORT } from './config.js'
import { findacustomer, showallcustomers } from './custormers.js'
import { getTransactions } from './customerTrans.js'

const app = express()

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

app.get("/customers", (req, res) => {
    showallcustomers(res)
})

app.get("/transactions/:custID", (req, res) => {
    const cID = req.params.custID
    getTransactions(res, cID)
})