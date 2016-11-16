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

        console.log(data.length);
        // this.destroyDb();
        for( let i = -1; i<=data.length;i++)
         this.add(data.pop(i));
         this.add(data.pop(-1));



        console.log("Db initialized");
}

add(obj) {
        return this._db.post(obj);
    }

destroyDb(){

  this._db.destroy().then(function(){
    console.log("Tables in db destroying ...Success!!");
  })
}

}
