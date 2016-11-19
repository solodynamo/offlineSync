import {Injectable} from '@angular/core';
import {UrlService} from './offlineSync.url-service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

var data = require("./data.json");
let PouchDB = require('pouchdb');

@Injectable()

export class OfflineService {
    private _db;
    private _data;
    private _dataArray: any[];

    constructor(private http: Http) { }

    private dataUrl = 'https://jsonplaceholder.typicode.com/posts/';





    getData(): Promise<any[]> {

        return Promise.resolve(data);
    }




    //this function calls the backend for getting new complaints/comments
    getComments(): Observable<Comment[]> {


        // ...using get request
        return this.http.get(this.dataUrl)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));

    }




    //Here i am trying to populate the data from backend

    callBackend() {

        this.getComments()
            .subscribe(comments => {
                this._dataArray = comments;
                console.log(this._dataArray);
                this.storeInWebsql(this._dataArray);
            })


        // this.storeInWebsql(this._dataArray);

    }


    //Here i am inserting the data in websql
    storeInWebsql(arrayOfData) {

        for (let i = -1; i <= arrayOfData.length; i++)
            this.add(arrayOfData.pop(i));
        this.add(arrayOfData.pop(-1));

    }






    initDB() {
        this._db = new PouchDB('StoreOne', { adapter: 'websql' });

        this._db.changes({ live: true, since: 'now', include_docs: true })
            .on('change', this.dataBaseChange);

        this.callBackend();


        console.log("Db initialized");
    }





    add(obj) {
        return this._db.post(obj);
    }





    destroyDb() {

        this._db.destroy().then(function() {
            console.log("Tables in db destroying ...Success!!");
        })
    }





    update(obj) {
        console.log("ust before", obj);

        return this._db.put(obj, (err, res) => {
            if (err) {
                console.info('error creating new doc', err);

            }
            if (res) {
                console.info('new doc created', res);

            }
        });
    }





    // I am Keeping this as store for getting offline data
    getAll(): any {

        return this._db.allDocs({ include_docs: true })
            .then(docs => {


                this._dataArray = docs.rows.map(row => {
                    return row.doc;
                });


                return this._dataArray;
            });
    }





    delete(obj) {
        return this._db.remove(obj);
    }





    populateData(): any {
        console.log(data.length);
        // this.destroyDb();
        for (let i = -1; i <= data.length; i++)
            this.add(data.pop(i));
        this.add(data.pop(-1));

    }



    //this function will track the database changes
    dataBaseChange() {
        console.log("changes in DB");
    }




}
