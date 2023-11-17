import { Component, OnInit } from '@angular/core';
import { SleepService } from '../../services/sleep.service';
// import { SleepData } from '../data/sleep-data';
// import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../../data/stanford-sleepiness-data';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
// import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-overnight',
  templateUrl: './overnight.page.html',
  // styleUrls: ['./sleepiness.page.scss'],
})
export class OvernightPage implements OnInit {

  level: number = 1;


  constructor
    (private sleepService: SleepService, private route: Router,
      private modalController: ModalController
      // public toastController: ToastController
    ) { }
  ngOnInit() { }

  // async presentToast() {
  //   const toast = await this.toastController.create({
  //     message: 'Your sleepiness level has been recorded!',
  //     duration: 2000
  //   });
  //   toast.present();
  // 	}

  dismissModal() {
    console.log("should dismiss")
    return this.modalController.dismiss(null, 'manual');
  }
  // 	// Record value once user prompts
  recordValue() {
    // Create new data of type StanfordSleepinessData and add to 
    this.sleepService.logSleepinessData(new StanfordSleepinessData(this.level, new Date()));
    // console.log(this.allSleepData);
    // this.presentToast();
    return this.modalController.dismiss(null, 'automatic');

    // Go back to home page and display modal to confirm success
    // this.route.navigate(['/home']);

  }

  // get allSleepData() {
  // 	return SleepService.AllSleepData;
  // }
}