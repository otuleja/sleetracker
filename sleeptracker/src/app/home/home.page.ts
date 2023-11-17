import { Component } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { ModalController } from '@ionic/angular';
import { SleepinessPage } from '../modals/sleepiness/sleepiness.page';

@Component({
	selector: 'app-home',
	templateUrl: 'home.page.html',
	styleUrls: ['home.page.scss'],
})
export class HomePage {
	standfordSleepinessArray: SleepData[] = [];
	overnightSleepDataArray: SleepData[] = [];
	constructor(public sleepService: SleepService, private mc: ModalController) {
	}

	ngOnInit() {
		console.log(this.allSleepData);
		this.processData();
	}

	processData() {
		const stanfordSleepinessArray = this.allSleepData.filter((sleepData) => sleepData instanceof StanfordSleepinessData);
		const overnightSleepDataArray = this.allSleepData.filter((sleepData) => sleepData instanceof OvernightSleepData);
		this.standfordSleepinessArray = stanfordSleepinessArray;
		this.overnightSleepDataArray = overnightSleepDataArray;
	}
	async passSleep() {
		const modal = await this.mc.create({
			component: SleepinessPage
		});

		// modal.onWillDismiss().then(dataReturned => {
		//   this.allSleepData.push(dataReturned.data);
		//   Storage.set({key:dataReturned.data.id, value: JSON.stringify(dataReturned.data)}).then();
		// });

		return await modal.present().then(async _ => {
			// triggered when opening the modal
			const { data, role } = await modal.onWillDismiss();

		});
	}
	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		return SleepService.AllSleepData;
	}

}
