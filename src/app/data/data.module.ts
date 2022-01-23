import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { IAuthentication } from '@app/domain/usecases/authentication';
import { HttpClientService } from '@app/infra/http-client.service';
import { AuthenticationService } from './authentication/authentication.service';
import { IHttpClient } from './protocols/http-client';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  exports: [],
  declarations: [],
  providers: [
    AuthenticationService,
    { provide: IHttpClient, useClass: HttpClientService },
    { provide: IAuthentication, useClass: AuthenticationService }
  ]
})
export class DataModule {}
