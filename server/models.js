var mongoose = require('mongoose');
var SkillSchema = new mongoose.Schema({
	skill: {
		type:String, 
		// minlength: [3, "must be atleast 3"],
	},
}, {timestamps: true})
mongoose.model('skills', SkillSchema)


var PetSchema = new mongoose.Schema({
	name: {
		type: String,
		minlength: [3, "Pet Name must be at least 3 chars long"],
		required: [true, 'Name is required']
	},
	type: {
		type: String,
		minlength: [3, "Pet Type must be at least 3 chars long"],
		required: [true, 'Type is required']
	},
	description: {
		type: String,
		minlength: [3, "Description must be at least 3 chars long"],
		required: [true, 'Description is required']
	},
	skills: [SkillSchema],
	likes: {
		type: Number,
		default: 0
	}
}, {timestamps: true})
mongoose.model('pets', PetSchema)
