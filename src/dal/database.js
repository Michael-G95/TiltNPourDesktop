const Brewery = require('./brewery');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Connection URL
const url = "mongodb+srv://devel:HTCjoVDQBXEH9inZ@cluster0-xrkzw.mongodb.net/tiltnpour?retryWrites=true&w=majority";

console.log("Connecting...");
mongoose.connect(url, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (x = null, y = null) => console.log(x, y));
db.once('open', function () {
    console.log("Connected OK");
});

const mapIdToObjectIdForUpdateOrDelete = (item) => {
    let tmp = { ...item, _id: item.id };
    delete item.id;
    return tmp;
}

const insertItem = (item, createItem) => {
    // Item contains the fields from the UI named same as object
    const theItem = createItem({ ...item });

    return new Promise((resolve, reject) => {
        theItem.save((err, obj) => {
            if (err) reject(err);
            else resolve(obj);
        });
    });
}


const insertBreweryFromUi = (item) => {
    // Try to save the object. 
    // returns the promise
    return insertItem(item, (x) => new Brewery.Model(Brewery.populateBreweryFields(x)));
}

const updateBrewery = (item) => {
    // Try to save the object. 
    // returns the promise
    var brewery = mapIdToObjectIdForUpdateOrDelete(Brewery.populateBreweryFields(item));

    return new Promise((resolve, reject) => {
        Brewery.Model.findOneAndUpdate({ _id: brewery._id }, brewery,
            (err, obj) => {
                if (err) reject(err);
                else resolve(obj);
            });
    });

}

const mapObjectIdToId = (args) => {

    if (Array.isArray(args)) {
        return args.map(a => {

            let tmp = { ...a, id: a._id.toString() }
            delete tmp.__v;
            delete tmp._id;
            return tmp;
        });
    } else {
        let tmp = args;
        tmp.id = args._id.toString();
        delete tmp.__v;
        delete tmp._id;
        return tmp;
    }
}

const getAllBreweries = () => {
    return new Promise((resolve, reject) => {
        // eslint-disable-next-line array-callback-return
        Brewery.Model.find().lean().exec((err, results) => {
            if (err)
                reject(err);
            else
                // using the populate here to ensure same order each time
                resolve(
                    mapObjectIdToId(results)
                        .map(b => Brewery.populateBreweryFields(b))
                );

        })
    });
}

const getBrewery = (id) => {
    return new Promise((resolve, reject) => {
        // eslint-disable-next-line array-callback-return
        Brewery.Model.find({ _id: ObjectId(id) }).lean().exec((err, results) => {
            if (err)
                reject(err);
            else
                // using the populate here to ensure same order each time
                resolve(
                    mapObjectIdToId(results)
                        .map(b => Brewery.populateBreweryFields(b))
                );
        })
    });
}



module.exports = {
    insertBreweryFromUi,
    getAllBreweries,
    getBrewery,
    updateBrewery
};
