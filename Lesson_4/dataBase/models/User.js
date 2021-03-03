const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, default: 18 },
    email: { type: String },
    cars: [{ type: Schema.Types.ObjectId }]
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

userSchema.virtual('full_name').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

userSchema.virtual('userCars', {
    ref: 'Car',
    localField: 'cars',
    foreignField: '_id',
});

userSchema
    .pre('find', function() {
        this.populate('userCars');
    })
    .pre('findOne', function() {
        this.populate('userCars');
    });

module.exports = model('User', userSchema);
