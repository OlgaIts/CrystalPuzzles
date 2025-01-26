import { AxiosConfig } from 'shared/api';
import { CheckListI } from './checkListApi.interface';
import { AxiosInstance } from 'axios';

export class CheckListApi {
	#host = AxiosConfig.$authHost as AxiosInstance;
	async create(params: CheckListI) {
		const data = await this.#host
			.post(`/lesson/create-check`, params)
			.then(({ data }: any) => [data, null])
			.catch(() => [null, 'Не удалось создать чек-лист']);
		return data;
	}
}
