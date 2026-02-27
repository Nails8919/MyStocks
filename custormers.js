
import { customerCollection } from "./mymongo.js"


const showallcustomers = (res) => {
    customerCollection
        .find(
            {},
            {
                limit: 15,
                sort: { birthdate: -1 },
                projection: {
                    accounts: 0,
                    tier_and_details: 0
                }

            }
        )

        .toArray()
        .then(results => {
            if (!results){
                res.status(400).json ({error:"No customers found"})
                return
            }
            for (let doc of results) {
                if (doc.name) {
                    let [firstname, lastname] = doc.name.split(" ")
                    doc.firstname = firstname
                    doc.lastname = lastname
                    delete doc.name
                }
            }
            res.json(results)
        }
    )
}

const findacustomer = (id, res) => {
    customerCollection()
        .findOne({ _id: Objectid })
    {
        projection: {
            birthdate: 1
            return
        }
    }
}

export { showallcustomers, findacustomer }