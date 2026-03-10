import { transCollection } from "./mymongo.js"

const getTransactions = (res, custID) => {
    transCollection
        .findOne({account_id: parseInt(custID)})
        .then(results => {
            if (!results)
                results = { error: `No transactions found for the given customer ID: ${custID}` }
            res.json(results)
        })
}


export { getTransactions }