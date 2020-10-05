
const mongoose = require ('mongoose'); 
const {Schema} = mongoose; 

const EmployeeSchema = new Schema ({ 
    name : {type: String, required: true},
    surname: {type: String, required: true},
    telephone: {type: String, required: true},
    email: {type: String, required: true},
    position: {type: String, required: true}
}); 

module.exports = mongoose.model('Employee', EmployeeSchema);
