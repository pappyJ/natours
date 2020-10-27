//importing mongoose

const mongoose = require('mongoose');

const slugify = require('slugify');

// const User = require('./userModel');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,

      required: [true, 'A Tour Must Have A Name'],

      unique: true,

      maxlength: [40, 'A Tour Must Have Less Than Or Equal To 40 Characters'],

      minlength: [10, 'A Tour Must Have Less Than Or Equal To 10 Characters'],
    },

    slug: String,

    duration: {
      type: Number,

      required: [true, 'A Tour Must Have A Duration'],
    },

    maxGroupSize: {
      type: Number,

      required: [true, 'A Tour Must Have A Group Size'],
    },

    difficulty: {
      type: String,

      required: [true, 'A Tour Must Have A Difficulty'],

      enum: {
        values: ['difficult', 'medium', 'easy'],

        message: 'Difficulty Is Either : Difficult , Medium , Easy',
      },
    },

    ratingsAverage: {
      type: Number,

      default: 4.5,

      min: [1, 'Rating Must Be Above Or Equal To 1.0'],

      max: [5, 'Rating Must Be Below Or Equal To 5`.0'],

      set: (val) => Math.round(val * 10) / 10,
    },

    ratingsQuantity: {
      type: Number,

      default: 0,
    },

    priceDiscount: {
      type: Number,

      validate: {
        validator:
          //This Points to current Docs only on data creation

          function (val) {
            return val < this.price;
          },

        message: 'Discount Price ({VALUE}) Should Be Below Regular Price',
      },
    },

    summary: {
      type: String,

      trim: true,

      required: [true, 'A Tour Must Have A Description'],
    },

    description: {
      type: String,

      trim: true,
    },

    imageCover: {
      type: String,

      required: [true, 'A Tour Must Have A Cover Image'],
    },

    images: {
      type: [String],
    },

    createdAt: {
      type: Date,

      default: Date.now(),

      select: false,
    },

    startDates: [Date],

    rating: {
      type: Number,

      default: 4.5,
    },

    price: {
      type: Number,

      required: [true, 'A Tour Must Have A Price'],
    },

    secretTour: {
      type: Boolean,

      default: false,
    },

    startLocation: {
      type: {
        type: String,

        default: 'Point',

        enum: ['Point'],
      },

      coordinates: [Number],

      address: String,

      description: String,
    },

    locations: [
      {
        type: {
          type: String,

          default: 'Point',

          enum: ['Point'],
        },

        coordinates: [Number],

        address: String,

        description: String,

        day: Number,
      },
    ],

    guides: [
      {
        type: mongoose.Schema.ObjectId,

        ref: 'User',
      },
    ],
  },

  {
    toJSON: {
      virtuals: true,
    },

    toObject: {
      virtuals: true,
    },
  }
);

tourSchema.index({ price: 1, ratingsAverage: -1 });

tourSchema.index({ slug: 1 });

tourSchema.index({ startLocation: '2dsphere' });

//declaring a virtual schema

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

tourSchema.virtual(
  'reviews',

  {
    ref: 'Review',

    foreignField: 'tour',

    localField: '_id',
  }
);

//the pre schema in mongoose does not affect insertMany(); <= Document Middleware

tourSchema.pre(/^find/, function (next) {
  this.find({
    secretTour: {
      $ne: true,
    },
  });

  this.start = Date.now();

  next();
});

tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides',

    select: '-__v -passwordChangedAt',
  });

  next();
});

// tourSchema.pre('save' , async function (next)

// {
//     const guidePromise = this.guides.map(async id => await User.findById(id))

//    this.guides = await Promise.all(guidePromise);

//     next();
// }

// )

tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
  });

  next();
});

//the query moongoose middleware

tourSchema.post(/^find/, function (doc, next) {
  console.log(`The Request Took ${Date.now() - this.start} Milliseconds!`);

  // console.log(doc);

  next();
});

//the aggregate middleware in moongoose

// tourSchema.pre('aggregate' , function(next) {

//     this.pipeline().unshift({$match: {secretTour: {$ne: true}}});

//     next();

// })

// tourSchema.pre('save' , function(next) {

//     console.log('Will Save Document...');

//     next();

// })

// //the post schema middleware in mongoose

// tourSchema.post('save' , function(doc , next) {

//     console.log(doc);

//     next();

// })

const Tour = mongoose.model('Tour', tourSchema);

// const testTour = new Tour({

//     name: "The Forest Hiker",

//     rating: 4.7,

//     price: 497

// });

// const testTour = new Tour({

//     name: "The Park Camper",

//     // rating: 4.7,

//     price: 997

// });

// testTour
//     .save()

//     .then(doc => console.log(doc))

//     .catch(err => console.log(`ERROR :fire:` , err));

module.exports = Tour;
