
import { customerCollection } from "./mymongo.js"

//find all customers and return them as json
const showallcustomers = (res, page) => {
    // const skip = (page - 1) * 15;
    customerCollection
        .find(
            {},
            {
                limit: 15,
                skip: page,
                sort: { birthdate: -1 },
                projection: {
                    // accounts: 1,
                    tier_and_details: 0
                }

            }
        )

        //results is an array of documents
        .toArray()
        .then(results => {
            if (!results) {
                res.status(400).json({ error: "No customers found" })
                return
            }

            //split the name field into firstname and lastname and add them as separate fields in the document
            for (let doc of results) {
                if (doc.name) {
                    // let [firstname, lastname] = doc.name.split(" ")
                    let names = doc.name.split(" ")
                    let firstname = names[0]
                    let lastname = names[1]
                    doc.firstname = firstname
                    doc.lastname = lastname
                    delete doc.name
                }
            }

            //send the results as json
            res.json(results)
        }
        )
}

//find a customer by id and return the birthdate field only
const findacustomer = (id, res) => {
    customerCollection()
        .findOne(
            { _id: Objectid(id) },
            {
                projection: {
                    birthdate: 1
                }
            }
        )
        .then(doc => {})
}

export { showallcustomers, findacustomer }