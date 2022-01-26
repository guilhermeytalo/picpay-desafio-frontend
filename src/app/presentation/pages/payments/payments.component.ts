import {
  Component,
  Optional,
  SkipSelf,
  ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';
import { ILocalStorage } from '@app/infra/cache/interfaces/ilocalstorage';

@Component({
  selector: 'app-payments',
  templateUrl: 'payments.component.html',
  styleUrls: ['payments.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaymentsComponent {
  constructor(
    @SkipSelf() @Optional() private readonly storageService: ILocalStorage,
    @SkipSelf() @Optional() private readonly router: Router
  ) {}

  removeItem(): void {
    this.storageService.deleteToken();
    this.router.navigate(['']);
  }
}
