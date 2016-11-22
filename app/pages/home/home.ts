import {Component, NgZone} from "@angular/core";
import {NavController, Platform, Modal} from 'ionic-angular';
import {OfflineService} from '../../services/offlineSync.service';
import {DetailsPage} from '../details/details';
import {Events} from 'ionic-angular';





@Component({
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
    static count: number = 0;


    constructor(private OfflineService: OfflineService,
        private nav: NavController,
        private zone: NgZone,
        private platform: Platform,
        private events: Events


    ) {
        this.events.subscribe('Destroyed', () => {
            console.log("Db destroyed ....refreshing.....")
            location.reload();
        });

        this.events.publish('InitializeDb');


    }


    ionViewLoaded() {
        this.platform.ready().then(() => {

            // this.OfflineService.initDB();

        });
    }
    ourData: any[];


    getData() {
        this.OfflineService.getAll()
            .then(
            comments => {
                this.ourData = comments
                HomePage.count = comments.length
            }, //Bind to view
            err => {
                // Log errors if any
                console.log(err);
                console.log("creating a new one.....Refresh");
                if (err) {

                    this.OfflineService.initDB();
                }
            });

    }




    refresh(refresher) {
        console.log("Refreshing the list . .........");

        this.OfflineService.callBackend();

        setTimeout(() => {
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);

    }

    clearTable() {
        this.OfflineService.destroyDb();
        console.log("database destroyed");
        this.ourData = [{ 'title': "No Data In Table", 'body': "You Must Have Clicked Clear Table Button" }];
        HomePage.count = 0;

    }

    get staticUrlArray() {
        return HomePage.count;
    }


    showDetail(obj) {
        let modal = Modal.create(DetailsPage, { birthday: obj });
        this.nav.present(modal);

        modal.onDismiss(() => {

        });
    }



}
