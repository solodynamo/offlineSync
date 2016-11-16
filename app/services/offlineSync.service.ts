import {Injectable} from '@angular/core';

var data = require( "./data.json");
let PouchDB = require ('pouchdb');



@Injectable()

export class OfflineService {
  private _db;
  private _data;
  private _dataArray:any[];

getData(): Promise<any[]>{

  return Promise.resolve(data);
}

initDB() {
        this._db = new PouchDB('StoreOne', { adapter: 'websql' });

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

getAll(): any {

  return this._db.allDocs({ include_docs: true })
          .then(docs => {

              // Each row has a .doc object and we just want to send an
              // array of birthday objects back to the calling controller,
              // so let's map the array to contain just the .doc objects.

              this._dataArray = docs.rows.map(row => {

                  return row.doc;
              });




              return this._dataArray;
          });
    }

populateData():any {
  console.log(data.length);
  // this.destroyDb();
  for( let i = -1; i<=data.length;i++)
   this.add(data.pop(i));
   this.add(data.pop(-1));


}
}
