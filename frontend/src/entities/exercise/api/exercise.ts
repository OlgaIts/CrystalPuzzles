import { AxiosConfig } from 'shared/api';
import { ExerciseI, ExerciseUpdateI } from './exercise.interface';
import { AxiosInstance } from 'axios';

export class ExerciseApi {
	#host = AxiosConfig.$authHost as AxiosInstance;

	async create(params: ExerciseI) {
		const data = await this.#host
			.post('/training', params)
			.then(({ data }: any) => [data, null])
			.catch(() => [null, 'Не удалось удалить упражнение']);
		return data;
	}

	async get() {
		const data = await this.#host
			.get('/training')
			.then(({ data: { records } }: any) => [records, null])
			.catch(() => [null, 'Не удалось получить список упражнений']);
		return data;
	}

	async getById(id: number) {
		const data = await this.#host
			.get('/training/' + id)
			.then(({ data }: any) => [data, null])
			.catch(() => [null, 'Не удалось получить упражнение']);
		return data;
	}

	async update(params: ExerciseUpdateI) {
		const data = await this.#host
			.put('/training', params)
			.then(({ data }: any) => [data, null])
			.catch(() => [null, 'Не удалось обновить упражнение']);
		return data;
	}

	async delete(id: number) {
		const data = await this.#host
			.delete('/training/' + id)
			.then(({ data }: any) => [data, null])
			.catch(() => [null, 'Не удалось удалить упражнение']);
		return data;
	}
}
