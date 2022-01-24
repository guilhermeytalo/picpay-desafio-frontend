export abstract class ILocalStorage {
  abstract set(item: unknown): void;
  abstract checkIfExistsUser(): boolean;
}
