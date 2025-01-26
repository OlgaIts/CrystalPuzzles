import { AxiosConfig } from 'shared/api';
import { AddStudentI, GroupI } from './groupApi.interface';

export class GroupApi {
	#host = AxiosConfig.$authHost;

	async create(group: GroupI) {
		const data = await this.#host
			.post('/group', group)
			.then(({ data }: any) => [data, null])
			.catch(() => [null, 'Не удалось создать группу']);
		return data;
	}

	async get() {
		const data = await this.#host
			.get('/group')
			.then(({ data: { records } }: any) => [records, null])
			.catch(() => [null, 'Не удалось получить список групп']);
		return data;
	}

	async getById(id: string) {
		const data = await this.#host
			.get('/group/' + id)
			.then(({ data }: any) => [data, null])
			.catch(() => [null, 'Не удалось получить группу']);
		return data;
	}

	async update(id: string, params: GroupI) {
		const data = await this.#host
			.put('/group/' + id, params)
			.then(({ data }: any) => [data, null])
			.catch(() => [null, 'Не удалось обновить группу']);
		return data;
	}

	async delete(id: string) {
		const data = await this.#host
			.delete('/group/' + id)
			.then(({ data }: any) => [data, null])
			.catch(() => [null, 'Не удалось удалить группу']);
		return data;
	}

	async addStudent(params: AddStudentI) {
		const data = await this.#host
			.post('/group/add-student/', params)
			.then(({ data }: any) => [data, null])
			.catch(() => [null, 'Не удалось удалить группу']);
		return data;
	}
}
