import {Component, NgZone} from "@angular/core";
import {NavController, Platform} from 'ionic-angular';
import {OfflineService} from '../../services/offlineSync.service';


@Component({
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage {


    constructor(private OfflineService: OfflineService,
        private nav: NavController,
        private zone: NgZone,
        private platform: Platform
    )
    { }


    ionViewLoaded() {
        this.platform.ready().then(() => {
            //Do Here which you want should happen as app starts
            this.OfflineService.initDB();

        });
    }
    ourData: any[];
    getData() {

        this.OfflineService.getAll().then((data) => {
            this.zone.run(() => {
                console.log(data);
                this.ourData = data;
            });
        })
    }


    refresh(refresher) {
        console.log("Refreshing the list . .........");
        this.OfflineService.populateData();
        setTimeout(() => {
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);

    }

}
