import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientService } from './http-client.service';

let service: HttpClientService;
let httpClientSpy: jasmine.SpyObj<HttpClient>;
describe('HttpClientService', () => {
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('IHttpClient', ['post']);
    TestBed.configureTestingModule({
      providers: [
        HttpClientService,
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });
    service = TestBed.inject(HttpClientService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });
  it('should init httpClientService', () => {
    expect(service).toBeTruthy();
  });
});
