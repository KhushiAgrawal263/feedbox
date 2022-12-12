var mongoose  =  require('mongoose');  
   
var fSchema = new mongoose.Schema({  
    Name:{  
        type:String  
    },  
    Email:{  
        type:String  
    }
});  
   
module.exports = mongoose.model('fModel', fSchema);