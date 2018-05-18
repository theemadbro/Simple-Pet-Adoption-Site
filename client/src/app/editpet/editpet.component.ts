import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
	selector: 'app-editpet',
	templateUrl: './editpet.component.html',
	styleUrls: ['./editpet.component.css']
})
export class EditpetComponent implements OnInit {
	constructor(private _httpService: HttpService,
		private _route: ActivatedRoute,
		private _router: Router) { }
	id: any;
	pet: any;
	slist= [];
	errors = []

	ngOnInit() {
		this._route.params.subscribe((params: Params) => this.id = params['id']);
		this.getpet(this.id)
	}
	getpet(id) {
		let info = this._httpService.singleGet(id)
		info.subscribe(data => { 
			console.log(data)
			console.log(data['skills'])
			var temp = []
			for (var i=0; i<data['skills'].length; i++){
				temp.push(data['skills'][i].skill)
				this.slist = temp
			}
			this.pet = data 
			console.log(this.pet)
		})
	}
	goback() {
		this._router.navigate(['/pets/'+this.id])
	}
	editpet(){
		this.pet.skills = this.slist
		let info = this._httpService.editMain(this.pet)
		info.subscribe(data => {
			console.log(data)
			if (data['state'] == 'good'){
	    		console.log(data)
	    		this.goback()
	    	}
	    	else if(data['state'] == 'bad'){
	    		console.log(data['data'])
	    		this.errors = []
	    		if (data['data']['errors']['name']){
	    			this.errors.push(data['data']['errors']['name']['message'])
	    		}
	    		if (data['data']['errors']['type']){
	    			this.errors.push(data['data']['errors']['type']['message'])
	    		}
	    		if (data['data']['errors']['description']){
	    			this.errors.push(data['data']['errors']['description']['message'])
	    		}

	    	}
		})
	}
}
