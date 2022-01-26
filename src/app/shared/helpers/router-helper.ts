import { environment } from 'environments/environment';

const BASE_URL = environment.apiUrl;
export class Routes {
  static getUser = `${BASE_URL}/account`;
  static getTasks = `${BASE_URL}/tasks`;
  static addPayment = `${BASE_URL}/tasks`;
}
