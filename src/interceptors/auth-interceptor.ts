import {Injectable} from "@angular/core";
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Observable} from "rxjs/Rx";
import {StorageService} from "../services/storage.service";
import {API_CONFIG} from "../config/api.config";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public storage: StorageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let localUser = this.storage.getLocalUser();
    let sizeBaseUrl = API_CONFIG.baseUrl.length;
    let requestToApi = req.url.substring(0, sizeBaseUrl) === API_CONFIG.baseUrl;
    if (localUser && requestToApi) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};

