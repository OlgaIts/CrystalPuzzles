import { AxiosConfig } from 'shared/api';
import { AxiosInstance } from 'axios';

export class PlaceApi {
	#host = AxiosConfig.$authHost as AxiosInstance;

	async get() {
		const data = await this.#host
			.get(`/space/`)
			.then(({ data: { records } }: any) => [records, null])
			.catch(() => [null, 'Не удалось получить места']);
		return data;
	}

	async getById(id: string | number) {
		const data = await this.#host
			.get('/space/' + id)
			.then(({ data }: any) => [data, null])
			.catch(() => [null, 'Не удалось получить место']);
		return data;
	}
}
