import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service'

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	constructor(private _httpService: HttpService) { }
	petlist = []

	ngOnInit() {
		this.getpets()
	}
	getpets() {
		let observable = this._httpService.getAllMain()
		observable.subscribe(data => {
			this.petlist = data['data']
			this.petlist.sort(function(a,b) {return (a.type.toUpperCase() > b.type.toUpperCase()) ? 1 : ((b.type.toUpperCase() > a.type.toUpperCase()) ? -1 : 0);} );
		})
		console.log(this.petlist)
	}

}
