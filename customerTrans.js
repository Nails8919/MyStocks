import { transCollection } from "./mymongo.js"

const getTransactions = (res,custID) => {
    transCollection
        .find(
            {},
            {
                limit: 15,
            }
        )
        .toArray()
        .then(transactions => {
            res.json(transactions)
        })
}

export { getTransactions }