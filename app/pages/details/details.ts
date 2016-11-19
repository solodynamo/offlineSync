import {Component} from '@angular/core';
import {Modal, NavParams, ViewController} from 'ionic-angular';
import { OfflineService } from '../../services/offlineSync.service';

@Component({
    templateUrl: 'build/pages/details/details.html'
})
export class DetailsPage {
    homeObj;

    constructor(private viewCtrl: ViewController, private navParams: NavParams, private OfflineService: OfflineService) { }
    ionViewLoaded() {
        this.homeObj = this.navParams.get('birthday');
        console.log("obj is ", this.homeObj);


    }
    delete() {
        this.OfflineService.delete(this.homeObj)
            .catch(console.error.bind(console));

        this.dismiss();
    }

    dismiss() {
        this.viewCtrl.dismiss(this.homeObj);
    }

    save() {
        console.log("before sending ", this.homeObj);
        this.OfflineService.update(this.homeObj)
            .catch(console.error.bind(console));

        this.dismiss();
    }




}
