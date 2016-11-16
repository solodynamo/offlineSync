import {Component,NgZone} from "@angular/core";
import {NavController, Platform} from 'ionic-angular';
import {OfflineService} from '../../services/offlineSync.service';


@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {


    constructor(private OfflineService: OfflineService,
        private nav: NavController,
        private zone:NgZone,
        private platform: Platform
         )
{}


    ionViewLoaded() {
        this.platform.ready().then(() => {
          //Do Here which you want should happen as app starts
          this.OfflineService.initDB();

        });
    }
    ourData:any[];
    getData() {

      this.OfflineService.getAll().then((data) =>{
        this.zone.run(()=>{
          console.log(data);
          this.ourData = data;
        });
      })
    }

    // save(obj) {
    //
    //         this.OfflineService.add(this.obj)
    //             .catch(console.error.bind(console));
    //
    // }

}
