import {Component} from "@angular/core";
import {NavController, Platform} from 'ionic-angular';
import {OfflineService} from '../../services/offlineSync.service';


@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {


    constructor(private OfflineService: OfflineService,
        private nav: NavController,
        private platform: Platform)
{}


    ionViewLoaded() {
        this.platform.ready().then(() => {
          //Do Here which you want should happen as app starts
          this.OfflineService.initDB();

        });
    }
    ourData:any[];
    getData() {


      this.OfflineService.getData().then((res)=>{

        console.log("gettting it ",res);

        this.ourData = res;
      });
    }
}
