const mongoose = require("mongoose");
mongoose.set('strictQuery',false); // 1

mongoose.connect("mongodb://localhost:27017/Weather_database" , {

    urlNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true

}).then(() => {                             // Promise
    console.log("Connection Success.");

}).catch((e) => {
    console.log("Connection Failed.");
})
