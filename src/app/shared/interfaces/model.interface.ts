export interface ModelInterface {
  id?: number;
  // eslint-disable-next-line @typescript-eslint/ban-types
  getValidationRules(): object;
}
