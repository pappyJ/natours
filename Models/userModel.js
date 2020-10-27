const mongoose = require('mongoose');

const validator = require('validator');

const bcrypt = require('bcryptjs');

const crypto = require('crypto');

const userSchema = new mongoose.Schema({


    name: 

    {
        type: String,

        required: [true , 'Every User Must Have A Name']
    },

    email:

    {
        type: String,

        required: [true , 'Every User Must Have An Email'],

        unique: true,

        lowercase: true,

        validate: [validator.isEmail , 'Please Provide A Valid Email']
    },

    photo: 
    
    {
        type : String,

        default : 'default.jpg'
    },

    password:

    {
        type: String,

        required: [true , 'Password Cannot Be Empty'],

        minlength: 8,

        select: false
    },

    passwordConfirm:

    {
        type: String,

        required: [true , 'Please Confirm Your Password'],

        validate:

        {
            validator:

            function(el)

            {
                return el === this.password;
            },

            message: 'Passwords Dont Match'
        }
    },

    passwordChangedAt:

    {
        type: Date
    },

    role:

    {
        type: String,

        enum: ['user' , 'guide' , 'lead-guide' , 'admin'],

        default: 'user'

    },

    passwordResetToken: String,

    passwordResetExpires: Date,

    active:

    {
        type: Boolean,

        default: true
    },

    limit:

    {
        type: Number,

        default: 0
    },

    limitExpiresIn:

    {
        type: Date,
    }


})

userSchema.pre('save' , async function (next){


    if(!this.isModified('password'))

    {
        return next();
    }

    this.password = await bcrypt.hash(this.password , 12);

    this.passwordConfirm = undefined;

    next();

})

userSchema.pre('save' , function(next)

{
    if(!this.isModified('password') || !this.isNew)

    {
        return next();
    }

    this.passwordChangedAt = Date.now() - 1000;

    next();
}

)


userSchema.pre(/^find/ , function(next) 

{
    this.find({active: {$ne: false}})

    next();
}

)

userSchema.methods.checkLogin = async function()

{

    if(this.limit < 3)

    {
        this.limit = this.limit + 1;

        await this.save({validateBeforeSave: false})

        return this.limit;
    }

    if(this.limitExpiresIn < Date.now())

    {
        this.limit = 0;
        
        this.limitExpiresIn = undefined

        await this.save({validateBeforeSave: false})

        return this;
    }
    

    if(this.limit > 3)

    {
        this.limitExpiresIn = Date.now() + 24 * 60 * 60 * 1000;

        await this.save({validateBeforeSave: false})
        
        return false
    }

}


userSchema.methods.correctPassword = async function(candidatePassword , userPassword)

{
    return await bcrypt.compare(candidatePassword , userPassword);
}

userSchema.methods.passwordChanged = function(JWTTimestamp)

{
    if(this.passwordChangedAt)

    {

        const realtime = parseInt(this.passwordChangedAt.getTime() , 10) / 1000;

        return JWTTimestamp <  realtime;
        
    }

    
    
}

userSchema.methods.createResetToken =  function ()

{
    const resetToken = crypto.randomBytes(32).toString('hex');

    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000

    return resetToken
}

const User = mongoose.model('User' , userSchema);


module.exports = User;