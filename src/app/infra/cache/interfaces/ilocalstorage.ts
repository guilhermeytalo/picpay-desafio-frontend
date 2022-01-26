export abstract class ILocalStorage {
  abstract deleteToken(): void;
  abstract set(item: unknown): void;
  abstract checkIfExistsUser(): boolean;
}
