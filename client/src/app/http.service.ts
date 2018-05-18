import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
	constructor(private _http: HttpClient){

    }
    getAllMain() {
    	console.log('get all pets! - from http.service.ts')
	    return this._http.get('/pet');
	}
	singleGet(id) {
		return this._http.get('/pet/'+id)
	}
	singleRemove(id) {
		return this._http.delete('/pet/'+id)
	}
	addMain(pet) {
		return this._http.post('/pet', pet)
	}
	addSubschema(id, inp) {
		return this._http.put('/mainschema/'+id+'/subschema', inp)
	}
	editMain(pet) {
		console.log('LETS EDIT THIS >>>',pet)
		console.log(pet._id)
		return this._http.put('/pet/'+pet._id, pet)
	}
	likePet(id) {
		console.log(id)
		return this._http.put('/pet/'+id+'/like', {"do":"like"})
	}
}


	