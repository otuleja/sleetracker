import { Injectable } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
// import { Plugins } from '@capacitor/core';
// const { Storage } = Plugins;
import { Preferences } from '@capacitor/preferences';
@Injectable({
	providedIn: 'root'
})
export class SleepService {
	private static LoadDefaultData: boolean = true;
	public static AllSleepData: SleepData[] = [];
	public static AllOvernightData: OvernightSleepData[] = [];
	public static AllSleepinessData: StanfordSleepinessData[] = [];

	constructor() {
		if (SleepService.LoadDefaultData) {
			this.addDefaultData();
			SleepService.LoadDefaultData = false;
		}
	}

	private addDefaultData() {
		// this.logOvernightData(new OvernightSleepData(new Date('February 18, 2021 01:03:00'), new Date('February 18, 2021 09:25:00')));
		// this.logSleepinessData(new StanfordSleepinessData(4, new Date('February 19, 2021 14:38:00')));
		// this.logOvernightData(new OvernightSleepData(new Date('February 20, 2021 23:11:00'), new Date('February 21, 2021 08:03:00')));

		Preferences.keys().then((data) => {
			data.keys.forEach(x => {
				console.log("ley", x)




				Preferences.get({ key: x }).then((result: any) => {
					var dt = JSON.parse(result.value);
					console.log("dt", dt)
					if (dt.sleepStart) {
						var temp = new OvernightSleepData(new Date(dt.sleepStart), new Date(dt.sleepEnd), new Date(dt.loggedAt));
						// console.log(temp.sortDate);
						SleepService.AllSleepData.push(temp);
					} else {
						// var tmp = new StanfordSleepinessData(dt.loggedValue, new Date(dt.loggedAt));
						// console.log(tmp.sortDate);
						// this.allSleepData.push(tmp);
					}

				})






			})
		});
	}
	public getEverything() {
		return SleepService.AllSleepData
	}
	public logOvernightData(sleepData: OvernightSleepData) {
		console.log("adding sleep data", sleepData)
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllOvernightData.push(sleepData);
		Preferences.set({
			key: sleepData.id, value: JSON.stringify({
				loggedAt: sleepData.loggedAt.toISOString(),
				sleepEnd: sleepData.sleepEnd.toISOString(),
				sleepStart: sleepData.sleepStart.toISOString(),
			})
		}).then(_ => {
			console.log("stored data");
		}).catch(err => {
			console.log("errrrr", err)
		});
	}

	public logSleepinessData(sleepData: StanfordSleepinessData) {
		console.log("here in log sleepiness data", sleepData)
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllSleepinessData.push(sleepData);
	}
}
