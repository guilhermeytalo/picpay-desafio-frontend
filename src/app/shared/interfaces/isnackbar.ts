export abstract class ISnackBar {
  abstract openSnackBar(
    message: string,
    type: 'error' | 'success' | 'info'
  ): void;
}
