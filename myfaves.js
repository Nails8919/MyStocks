import { ObjectId } from "mongodb"
import { FavesCollection } from "./mymongo.js"

//add a customer to the favorites collection
const addtoFaves = (res, custID) => {
    FavesCollection
        .countDocuments({ customerID: custID })
        .then(count => {
            if (count > 0) {
                res.status(400).json({ message: `Customer with ID ${custID} is already in favorites.` })
                return
            }

            //add the customer to the favorites collection
            FavesCollection
                .insertOne({ customerID: custID })
                .then(result => {
                    if (result.insertedId)
                        res.status(201).json({ message: `Customer with ID ${custID} added to favorites.` })
                    else {
                        res.status(500).json({ error: `Failed to add customer with ID ${custID} to favorites.` })
                    }
                })
        })
}

//delete a customer from the favorites collection
const deleteFromFaves = (res, custID) => {
    FavesCollection
        .countDocuments({ customerID: custID })
        .then(count => {
            if (count == 0) {
                res.status(400).json({ message: `Customer with ID ${custID} does not exist.` })
                return
            }

            //delete the customer from the favorites collection
            FavesCollection
                .deleteOne({ customerID: custID })
                .then(result => {
                    if (result.deletedCount > 0) {
                        res.status(200).json({ message: `Customer with ID ${custID} removed from favorites.` })
                    }
                    else {
                        res.status(500).json({ error: `Failed to remove customer with ID ${custID} from favorites.` })
                    }
                }
                )
        })
}

//update the memo field of a favorite customer
const updateMemo = (res, fID, theMemo) => {
    //convert fID to ObjectID
    fID = new ObjectId(fID)

    // //verify the fID exists in the collection
    // FavesCollection
    //     .countDocuments({ _id: fID })
    //     .then(counts => {
    //         if (counts = 0) {
    //             res.status(400).json({ "error": "Favourite ID doesnt exist" })
    //             return
    //         }
    //     })

    //update the memo field  with the new value
    const query = {_id:fID}
    const updateData = {$set:{memo: theMemo}}
    const options = {upsert :true}
    FavesCollection
        .updateOne({query, data, options})
        .then(result =>{
            if (result.matchedCount > 0 || result.modifiedCount == 0) {
                res.status(400).json({"error": `Update failed: ${result.matchedCount} documents found and ${result.modifiedCount} documents modified.`})
                return
            }
            res.status(200).json ({message : "Message updated sucesffuly"})
        })
}

export { addtoFaves, deleteFromFaves, updateMemo }