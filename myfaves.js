import { FavesCollection } from "./mymongo.js"

const addtoFaves = (res, custID) => {
    FavesCollection
        .countDocuments({ customerID: custID })
        .then(count => {
            if (count > 0) {
                res.status(400).json({ message: `Customer with ID ${custID} is already in favorites.` })
                return
            }
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

const deleteFromFaves = (res, custID) => {
    FavesCollection
        .countDocuments({ customerID: custID })
        .then(count => {
            if (count == 0) {
                res.status(400).json({ message: `Customer with ID ${custID} does not exist.` })
                return
            }
            FavesCollection
                .deleteOne({ customerID: custID })
                .then(result => {
                    if (result.deletedCount > 0){
                        res.status(200).json({ message: `Customer with ID ${custID} removed from favorites.` })
                    }
                    else {
                        res.status(500).json({ error: `Failed to remove customer with ID ${custID} from favorites.` })
                    }
                }
                )
        })
}

export { addtoFaves, deleteFromFaves }