import moment, { Moment } from 'moment';
import { Lesson } from 'entities/lesson';
import { setLessons } from '../schedule';
import store from '../store';

export const getLessons = async (trainer_id: string | number, date: Moment) => {
	const dispatch = store.dispatch;

	if (!trainer_id || !date) return;
	const [data, err] = await Lesson.get({
		start_date: date.clone().toISOString(),
		end_date: date.clone().add(13, 'days').toISOString(),
		trainer: trainer_id
	});

	if (err) return;
	const obj = initData(date);
	data.forEach((item: any) => {
		const key = moment(item.start).format('YYYY-MM-DD');
		if (!Object.keys(obj).includes(key)) return;
		if (!obj[key]) obj[key] = [item];
		else obj[key] = [...obj[key], item];
	});

	dispatch(setLessons(obj));
};

function initData(date: Moment) {
	const obj: any = {};
	for (let index = 0; index < 14; index++) {
		obj[moment(date).add(index, 'days').format('YYYY-MM-DD')] = [];
	}
	return obj;
}
