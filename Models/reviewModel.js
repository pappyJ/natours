const mongoose = require('mongoose');

const Tour = require('./tourModel');

const reviewSchema = new mongoose.Schema({


    review:

    {
        type: String,

        required: [true , 'Review Cannot Be Empty   ']
    },

    rating:

    {
        type: Number,

        min: [1.0 , 'Review Rating Must Be Greater Than 1.0'],

        max: [5.0 , 'Review Rating Must Be Greater Than 1.0']
    },

    createdAt:

    {
        type: Date,

        default: Date.now()
    },

    tour:

    {
        type: mongoose.Schema.ObjectId,

        ref: 'Tour',

        required: [true , 'Review Must Belong To A Tour']
    },

    user:

    {
        type: mongoose.Schema.ObjectId,

        ref: 'User',

        required: [true , 'Review Must Belong To A User']
    }

},

{
    toJSON: {virtuals : true},

    toObject: {virtuals: true}
}


)

reviewSchema.index({tour : 1 , user : 1} , { unique : true});

//populating the review data

reviewSchema.pre(/^find/ , function(next)

{

    // this.populate({

    //     path: 'tour',

    //     select: 'name'

    // }).populate({


    //     path: 'user',

    //     select: 'name photo'

    // })


    this.populate({

        path: 'user',

        select: 'name photo'
    })

    next();
}

)

reviewSchema.statics.calcAverage = async function (tourId)

{
    const statics = await this.aggregate([


        {
            $match: 

            {
                tour : tourId
            }
        },

        {
            $group:

            {
                _id : '$tour',

                avgRating : { $avg : '$rating'},

                nRating : { $sum : 1}

            }
        }


    ]);

    if(statics.length > 0)

    {
        await Tour.findByIdAndUpdate(tourId , 
        
            {
                ratingsQuantity : statics[0].nRating,
    
                ratingsAverage : statics[0].avgRating
            }
            
            );
    }

    else

    {
        await Tour.findByIdAndUpdate(tourId , 
        
            {
                ratingsQuantity : 0,
    
                ratingsAverage : 4.5
            }
            
            ); 
    }
}

reviewSchema.post('save' , function () 

{
    this.constructor.calcAverage(this.tour)
}

)

reviewSchema.pre(/findOneAnd/ , async function ()

{
    this.r = await this.find()
}

)

reviewSchema.post(/findOneAnd/ , async function () 

{
    await this.r.constructor.calcAverage(this.r.tour)
}

)
//ceating the model out of the review schema

const Review = mongoose.model('Review' , reviewSchema);


//exporting the review

module.exports = Review;