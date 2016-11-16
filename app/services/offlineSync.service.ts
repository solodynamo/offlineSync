import {Injectable} from '@angular/core';

var data = require( "./data.json");
let PouchDB = require ('pouchdb');



@Injectable()

export class OfflineService {
  private _db;
  private _data;

getData(): Promise<any[]>{

  return Promise.resolve(data);
}

initDB() {
        this._db = new PouchDB('StoreOne', { adapter: 'websql' });
        console.log("Db initialized");
}



}
