import Cookies from 'js-cookie';
import { AxiosConfig } from 'shared/api';
import {
	EditProfileParams,
	LoginParams,
	RegisterParams
} from './auth.interface';
import { Profile } from 'entities/profile';
import store from 'app/providers/store/store';
import { setProfile } from 'app/providers/store';
import { AxiosInstance, AxiosResponse } from 'axios';

class Auth {
	#host = AxiosConfig.$host as AxiosInstance;
	#authHost = AxiosConfig.$authHost as AxiosInstance;

	async register(params: RegisterParams): Promise<void | any> {
		const data = await this.#host
			.post('/user/register', params)
			.then((res: AxiosResponse) => {
				if (res.status === 409) {
					return [null, 'Такой пользователь уже существует'];
				} else {
					return this.login(params);
				}
			})
			.catch(() => [null, 'Не удалось зарегистрироваться']);

		return data;
	}

	async login(params: LoginParams): Promise<void | any> {
		const { email, password } = params;
		const formData = new FormData();
		formData.append('username', email);
		formData.append('password', password);

		const data = await this.#host
			.post('/auth/login', formData)
			.then(
				({ data: { access_token } }: { data: { access_token: string } }) => {
					Cookies.set('token', access_token, {
						sameSite: 'strict',
						secure: true
					});
					return [null, null];
				}
			)
			.then(() => this.getProfile())
			.catch(() => [null, 'Не верное сочетание логина/пароля']);
		return data;
	}

	async getProfile() {
		const data = await this.#authHost
			.get('/profile')
			.then(({ data }: { data: any }) => [new Profile(data), null])
			.catch(() => [null, 'Не удалось получить профиль']);
		if (data[0]) {
			store.dispatch(setProfile(data[0]));
		}
		return data;
	}

	async updateProfile(params: EditProfileParams) {
		const data = await this.#authHost
			.put('/profile/edit', params)
			.then(({ data }: { data: any }) => [data, null])
			.catch(() => [null, 'Не удалось обновить профиль']);
		return data;
	}

	async updateToken() {
		const data = await this.#authHost
			.post('/auth/refresh-token')
			.then(({ data: { access_token } }: { data: { access_token: string } }) =>
				Cookies.set('token', access_token)
			)
			.catch(() => [null, 'Не удалось обновить токен']);
		return data;
	}

	async changePassword(params: {
		email: string;
		old_password: string;
		new_password: string;
	}): Promise<void | any> {
		const { old_password, new_password } = params;

		const data = await this.#authHost
			.post('/user/change-password', { old_password, new_password })
			.catch(() => [null, 'Не удалось изменить пароль']);
		return data;
	}

	async logout() {
		const data = await this.#authHost
			.post('/auth/logout')
			.then(() => Cookies.remove('token', { sameSite: 'strict' }))
			.then(() => (location.href = '/'))
			.catch(() => [null, 'Не удалось выйти']);
		return data;
	}
}

export default new Auth();
