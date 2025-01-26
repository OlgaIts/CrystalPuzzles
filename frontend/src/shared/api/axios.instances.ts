import axios, {
	AxiosInstance,
	AxiosResponse,
	InternalAxiosRequestConfig
} from 'axios';
import Cookies from 'js-cookie';
import { ErrorResponse } from 'react-router-dom';
import { store } from 'app/providers/store';
import { setIsLoading } from 'app/providers/store/app';

declare global {
	interface Window {
		API_URL: string;
	}
}

class AxiosConfig {
	$authHost!: AxiosInstance;
	$host!: AxiosInstance;

	constructor() {
		this.init();
	}

	init() {
		axios.defaults.baseURL = process.env.REACT_APP_SERVER_API || window.API_URL;
		axios.interceptors.request.use((config) => {
			store.dispatch(setIsLoading(true));
			return config;
		});
		axios.interceptors.response.use((res) => {
			store.dispatch(setIsLoading(false));
			return res;
		});

		this.$authHost = axios.create();
		this.$host = axios.create();

		this.$authHost.interceptors.request.use(
			(config: InternalAxiosRequestConfig) => {
				const token = Cookies.get('token');
				if (!token) return config;

				config.headers!.authorization = `Bearer ${token}`;
				return config;
			}
		);

		this.$authHost.interceptors.response.use(
			(res: AxiosResponse) => res,
			async (err: ErrorResponse) => {
				if (
					err.status === 403 &&
					location.pathname !== '/login' &&
					location.pathname !== '/registration'
				) {
					location.href = '/login';
				}
			}
		);
	}
}

export default new AxiosConfig();
