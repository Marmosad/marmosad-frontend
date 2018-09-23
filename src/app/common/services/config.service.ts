import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {

    public settings: any;

    constructor(private http: HttpClient) {}

    load() {
        const jsonFile = `assets/config/config.dev.json`;
        return new Promise<void>((resolve, reject) => {
            this.http.get(jsonFile).subscribe((res: Response) => {
              this.settings = res;
              resolve();
            }, (err) => {
              console.log(err);
            });
        });
    }
}
