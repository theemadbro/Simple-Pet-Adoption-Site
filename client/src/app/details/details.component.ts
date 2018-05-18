import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
	constructor(private _httpService: HttpService,
		private _route: ActivatedRoute,
		private _router: Router) { }
	id: any;
	pet: any;
	slist= [];

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
		this._router.navigate(['/pets'])
	}
	likepet(){
		let info = this._httpService.likePet(this.id)
		info.subscribe(data => {
			console.log('liked a pet!!!')
		})
		this.getpet(this.id)
	}
	deletePet(){
		let info = this._httpService.singleRemove(this.id)
		info.subscribe(data => {
			this.goback()
		})
	}
}
