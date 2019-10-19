const mongoose = require('mongoose'); // We need the mongoose library
// Connection to local database named 'test'. If 'test' doesn't exists, it will automatically be created.
mongoose.connect('mongodb://localhost/customers', {useNewUrlParser: true, useUnifiedTopology: true})
    .then((connection) => { // When the Promise resolves, we do some stuff.
        console.log("Database connected");
        doStuff();
    })
    .catch(e => { // If any errors happens during connection, we print them here.
        console.error(e)
    });


async function doStuff() {
    // This is the schema for customer
    const personSchema = new mongoose.Schema({
        name: String, // A customer only has a name.
        password: String,
        admin: Boolean
    });

    // The model is used to do CRUD stuff with customer
    let personModel = mongoose.model('User', personSchema);
    // And this is how the model is used to CREATE an object.
    let person = new personModel({ name: 'Elisa' , password: '1234', admin: true});

    // Let's save it.
    try {
        let savedPerson = await person.save();
        console.log("Saved person.", savedPerson); // It is now saved!
    } catch(err) { // Error handling in case it doesn't save
        console.error(err);
    }

    // You could do try/catch here as well, but I left it out.
    // Find first one with name 'person'
    let customer = await personModel.findOne({name: /elisa/i}, {admin: true});
    console.log("Found a customer!", customer); // Print it!

    //change my person name not working
    let updatedCustomer = await personModel.updateOne({ name: 'Elisa' }, { ship: 'Alexandra' });
    console.log("updated customer", updatedCustomer)

    //find alexandra
    let findCustomer = await personModel.findOne({ name: "Alexandra" });
    console.log("found customer", findCustomer)

    await mongoose.disconnect();
    console.log("Databased disconnected");
}