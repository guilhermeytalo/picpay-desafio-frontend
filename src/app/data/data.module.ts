import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { IAuthentication } from '@app/domain/usecases/authentication';
import { HttpClientService } from '@app/infra/http/http-client.service';
import { IHttpClient } from './protocols/http-client';
import { AuthenticationService } from './usecases/authentication/authentication.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  exports: [],
  declarations: [],
  providers: [
    { provide: IHttpClient, useClass: HttpClientService },
    { provide: IAuthentication, useClass: AuthenticationService }
  ]
})
export class DataModule {}
