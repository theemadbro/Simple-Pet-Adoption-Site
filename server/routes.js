const path = require('path')
const mongoose = require('mongoose'),
	pets = mongoose.model('pets'),
	skill = mongoose.model('skills')
module.exports = function(app) {

	// get all pets
	app.get('/pet', function(req, res) {
		console.log('get all')
		pets.find({}, function(err, data) {
			if (err) {
				console.log('THERE ARE ERRORS!!!')
				pack['state'] = 'bad'
				pack['data'] = err
				res.json(pack)
			}
			else {
				res.json({data: data})
			}
		})
	})
	// add an pets
	app.post('/pet', function(req, res) {
		var pack = {
			state: "good",
			data: '',
		}
		console.log('Making new pets')
		var newpet = new pets({
			name: req.body.name,
			type: req.body.type,
			description: req.body.desc,
		})
		console.log(req.body.skills)
		let slist = req.body.skills
		for (var i=0; i<slist.length; i++){
			console.log(i, slist[i])
			newpet.skills[i] = new skill({skill: slist[i]})
		}
		newpet.save(function(err, data){
			if (err) {
				console.log('POST/CREATION ERRORS!')
				pack['state'] = 'bad'
				pack['data'] = err
				res.json(pack)
			}
			else {
				console.log('POST SUCCESS!')
				pack['data'] = data
				res.json(pack)
				// res.redirect('/pets/'+data._id)
			}
		})
	})
	// get single pets
	app.get('/pet/:id', function(req, res) {
		console.log('get one')
		pets.findOne({_id: req.params.id}, function(err, singleData) {
			if (err) {
				console.log(err)
				res.json(err)
			}
			else {
				res.json(singleData)
			}
		})
	})
	// update single pets
	app.put('/pet/:id', function(req, res) {
		var pack = {
			state: "good",
			data: '',
		}
		console.log(req.body)
		let updatedInfo = {
			name: req.body.name,
			type: req.body.type,
			description: req.body.description,
			likes: req.body.likes,
			skills: ''
		}
		console.log(updatedInfo)
		pets.findOne({_id: req.params.id}, function(err, singleData) {
			if (err) {
				console.log(err)
				res.json(err)
			}
			else {
				let pet = singleData
				pet.name = updatedInfo.name
				pet.type	= updatedInfo.type
				pet.description = updatedInfo.description
				pet.skills = ''
				let slist = req.body.skills
				console.log('slist!',slist)
				for (var i=0; i<slist.length; i++){
					if (slist[i] == ''){
						console.log('skip this')
					}
					console.log(i, slist[i])
					pet.skills[i] = new skill({skill: slist[i]})
				}
				pet.save(function(err, data){
					if (err) {
						console.log('POST/CREATION ERRORS!')
						pack['state'] = 'bad'
						pack['data'] = err
						res.json(pack)
					}
					else {
						console.log('POST SUCCESS!')
						pack['data'] = data
						res.json(pack)
						// res.redirect('/pets/'+data._id)
					}
				})
			}
		})
	})
	// delete pets
	app.delete('/pet/:id', function(req, res) {
		pets.deleteOne({_id: req.params.id}, function(err, singleData) {
			if (err) {
				console.log(err)
				res.json(err)
			}
			// Will return a message of if the action went ok
			res.json(singleData)
		})
	}) 
	// add votes to pets
	app.put('/pet/:id/like', function(req, res) {
		console.log('hit adding votes')
		var pack = {
			state: "good",
			data: '',
		}
		console.log(req.params.id)

		pets.findOne({_id: req.params.id}, function(err, singleData) {
			if (err) {
				console.log('error!', err)
				res.json(err)
			}
			else {
				console.log('success!', singleData)
				pet = singleData
				pet.likes += 1
				pet.save(function(err, data) {
					if (err) {
						console.log('error incrementing likes!')
						res.json(err)
					}
					else {
						pack['data'] = data
						res.json(pack)
					}
				})
			}
		})
	})
	// catch all for angular routes
	app.all("**", (req, res, next) => {
		console.log('route hits!')
		res.sendFile(path.resolve("./client/dist/client/index.html"))
	})
}
