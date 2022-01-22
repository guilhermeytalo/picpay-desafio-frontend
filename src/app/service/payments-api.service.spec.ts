import { TestBed } from "@angular/core/testing";

import { PaymentsApiService } from "./payments-api.service";

describe("paymentsApiService", () => {
  let service: PaymentsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentsApiService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
