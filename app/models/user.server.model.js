const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        index: true
    },
    username: {
        type: String,
        trim: true,
        unique: true
    },
    password: String,
    created: {
        type: Date,
        default: Date.now
    },
    website: {
        type: String,
        set: function (url){
            if (!url) {
                return url;
            } else {
                if (url.indexOf('http://') !==0 && url.indexOf('https://') !==0){
                    url = 'http://' + url;
                }

                return url;
            }
        }
    }
});

//Get method and set method for the UserSchema virtual attribute
UserSchema.virtual('fullname').get(function(){
    return this.firstName + ' ' + this.lastName;
}).set(function(fullName){
    const splitName = fullName.split(' ');
    this.firstName = splitName[0] || '';
    this.lastName = splitName[1] || '';
});

UserSchema.set('toJSON', {getters: true, virtuals: true});
mongoose.model('User', UserSchema);