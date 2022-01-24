import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ILocalStorage } from './cache/interfaces/ilocalstorage';
import LocalStorageService from './cache/local-storage.service';
import { AuthGuard } from './guard/auth.guard';
import { SessionGuard } from './guard/session.guard';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    SessionGuard,
    AuthGuard,
    { provide: ILocalStorage, useClass: LocalStorageService }
  ]
})
export class InfraModule {}
