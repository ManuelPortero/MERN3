const mongoose = require ('mongoose'); 
const {Schema} = mongoose; 

const CustomerSchema= new Schema ({ 
    name : {type: String, required: true},
    surname: {type: String, required: true},
    telephone: {type: String, required: true},
    email: {type: String, required: true},
    company: {type: String, required: true}
}); 

module.exports = mongoose.model('Customer', CustomerSchema); 