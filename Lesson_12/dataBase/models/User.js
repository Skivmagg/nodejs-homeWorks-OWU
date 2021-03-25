const { Schema, model } = require('mongoose');

const { dataBaseTablesEnum: { USER } } = require('../../constant');

const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, default: 18 },
    role: { type: String, default: 'user' },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: false },
    docs: [{ type: String, required: false }],
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

module.exports = model(USER, userSchema);
