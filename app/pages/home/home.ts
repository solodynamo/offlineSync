import {Component, NgZone} from "@angular/core";
import {NavController, Platform} from 'ionic-angular';
import {OfflineService} from '../../services/offlineSync.service';


@Component({
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  static count : number = 0;


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

        // this.OfflineService.getAll().then((data) => {
        //     this.zone.run(() => {
        //         console.log(data);
        //         this.ourData = data;
        //     });
        // })

        this.OfflineService.getComments()
                           .subscribe(
                               comments => {this.ourData = comments
                               HomePage.count = comments.length}, //Bind to view
                                err => {
                                    // Log errors if any
                                    console.log(err);
        });

    }


    refresh(refresher) {
        console.log("Refreshing the list . .........");
        // this.OfflineService.populateData();
        this.OfflineService.getComments()
                          .subscribe( comments =>{
                            this.ourData = comments
                            HomePage.count += comments.length
                          })
        setTimeout(() => {
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);

    }

    clearTable(){
      this.OfflineService.destroyDb();
    }

    get staticUrlArray() {
    return HomePage.count;
    }


}
