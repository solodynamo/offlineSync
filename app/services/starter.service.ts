import {Injectable} from '@angular/core';

var data = require( "./data.json");


@Injectable()

export class StarterService {

getData(): Promise<any[]>{

  return Promise.resolve(data);
}

}
