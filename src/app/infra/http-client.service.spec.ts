import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientService } from './http-client.service';
import faker from 'faker';
import { of } from 'rxjs';
let service: HttpClientService;
let httpClientSpy: jasmine.SpyObj<HttpClient>;
describe('HttpClientService', () => {
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('IHttpClient', ['get']);
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

  it('should request with  URL GET', () => {
    httpClientSpy.get.and.returnValue(of(faker.internet.url(), {}));
    const url = faker.internet.url();
    service.get(url, {});
    expect(httpClientSpy.get).toHaveBeenCalledWith(url, {});
  });
});
