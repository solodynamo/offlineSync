import {Component} from '@angular/core';
import {Modal, NavParams, ViewController} from 'ionic-angular';
import {OfflineService} from '../../services/offlineSync.service';

@Component({
  templateUrl: 'build/pages/details/details.html',
})
export class DetailsPage {
  homeObj;

 constructor(private viewCtrl:ViewController,private navParams: NavParams){}
 ionViewLoaded() {
        this.homeObj = this.navParams.get('obj');
    }
  dismiss() {
          this.viewCtrl.dismiss(this.homeObj);
      }
}
