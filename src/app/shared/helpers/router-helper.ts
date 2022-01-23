import { environment } from 'environments/environment';

const BASE_URL = environment.apiUrl;
export class Routes {
  static getUser = `${BASE_URL}/account`;
}
