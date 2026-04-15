import express from 'express'
import { PORT } from './config.js'
import { findacustomer, showallcustomers } from './custormers.js'
import { getTransactions } from './customerTrans.js'
import { addtoFaves, deleteFromFaves, updateMemo } from './myfaves.js'
import cors from 'cors'

// Create an Express application
const app = express()

// Middleware to parse JSON bodies and enable CORS
app.use(express.json()) // Middleware to parse JSON bodies
app.use(cors()) // Enable CORS for all routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

// Define routes
app.get("/customers", (req, res) => {
    showallcustomers(res)
})

app.get("/customers/pg:page", (req, res) => {
    const pageSize = 15
    let page = parseInt(req.params.page)
    console.log(page,pageSize)
    if (isNaN(page) || page < 1) {
        res.status(400).json({ error: "Invalid page number" })
        return
    }
    page = (page - 1) * pageSize
    showallcustomers(res, page)
})

app.get("/transactions/:custID", (req, res) => {
    const cID = req.params.custID
    if (isNaN(cID)) {
        res.status(400).json({ error: "Invalid customer ID" })
        return
    }
    getTransactions(res, cID)
})

app.post("/customers/add/:custID", (req, res) => {
    const cID = req.params.custID
    if (isNaN(cID)) {
        res.status(400).json({ error: "Invalid customer ID" })
        return
    }
    addtoFaves(res, parseInt(cID))
})

app.delete("/faves/remove", (req, res) => {
    const data = req.body
    deleteFromFaves(res, data.cID)
})

app.put('/memo', (req, res) => {
    // const { fID, memo } = req.body
    const data = req.body
    if (!data || !data.fID || !data.memo) {
        res.status(400).json({ error: "Corrupted or requested missing request data" })
        return
    }
    if (data.memo.length > 160) {
        res.status(400).json({ error: "Memo exceeds 160 characters" })
        return
    }
    updateMemo(res, data.fID, data.memo)
})