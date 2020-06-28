const Brewery = require('./brewery');
const mongoose = require('mongoose');

// Connection URL
const url = "mongodb+srv://devel:HTCjoVDQBXEH9inZ@cluster0-xrkzw.mongodb.net/tiltnpour?retryWrites=true&w=majority";

console.log("Connecting...");
mongoose.connect(url, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (x = null, y = null) => console.log(x, y));
db.once('open', function () {
    console.log("Connected OK");
});


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

module.exports = {
    insertBreweryFromUi
};
