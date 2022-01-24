import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ILocalStorage } from './cache/interfaces/ilocalstorage';
import LocalStorageService from './cache/local-storage.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [{ provide: ILocalStorage, useClass: LocalStorageService }]
})
export class InfraModule {}
