import { AxiosConfig } from 'shared/api';

export class ProfileApi {
	#host = AxiosConfig.$authHost;
}
