import { NavigationExtras } from '@angular/router';

export class RouterFakeMock {
    public static navigated = false;

    public navigateByUrl(url: string, extras?: NavigationExtras): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            RouterFakeMock.navigated = true;
            resolve(true);
        });
    }

}
