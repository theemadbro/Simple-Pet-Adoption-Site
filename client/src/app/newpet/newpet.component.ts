import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
	selector: 'app-newpet',
	templateUrl: './newpet.component.html',
	styleUrls: ['./newpet.component.css']
})
export class NewpetComponent implements OnInit {
	constructor(private _httpService: HttpService,
		private _route: ActivatedRoute,
		private _router: Router) { }
	newpet: any;
	errors = [];

	ngOnInit() {
		this.newpet = {
			name: '',
			type: '',
			desc: '',
			skills: []
		}
	}
	newPet() {
		console.log(this.newpet)
		let observable = this._httpService.addMain(this.newpet)
	    observable.subscribe(data => {
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
	    	console.log(data)
	    	console.log('this.errors -', this.errors)
    		// console.log(data['data'])
		})
	}
	goback() {
		this._router.navigate(['/pets'])
	}

}
