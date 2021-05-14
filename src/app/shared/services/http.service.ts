import { environment } from '../../../environments/environment';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApexService } from "./apex.service";
import { Util } from '../utils/util';

@Injectable()
export class HttpService {
  private host = environment.API_END_POINT;
  private altHost = environment.API_END_POINT;

  constructor(private http: HttpClient,private apexService:ApexService) {
    // this.langService();
  }

  get(url: string, data: any, loader?: boolean) {
    this.apexService.showLoader(loader ? true : false);
    let paramString = Util.GetParamString(data ? data.data : {});
    url = this.host + url + paramString;
    return this.http.get(url);
  }

  post(url: string, data: any, loader?: boolean) {
    this.apexService.showLoader(loader ? true : false);
    url = this.host + url;
    return this.http.post(url, data);
  }

  put(url: string, data: any, loader?: boolean) {
    this.apexService.showLoader(loader ? true : false);
    url = this.host + url;
    return this.http.put(url, data);
  }

  delete(url: string, data: any, loader?: boolean) {
    this.apexService.showLoader(loader ? true : false);
    let paramString = Util.GetParamString(data ? data : {});
    url = this.host + url + paramString;
    return this.http.delete(url);
  }




}
