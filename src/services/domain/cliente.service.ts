import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {API_CONFIG} from "../../config/api.config";
import {Observable} from "rxjs/Rx";
import {ClienteDTO} from "../../models/cliente.dto";
import {StorageService} from "../storage.service";

@Injectable()
export class ClienteService {

  constructor(public http: HttpClient, public storage: StorageService) {
  }

  findById(id: string): Observable<any> {
    return this.http.get<any>(`${API_CONFIG.baseUrl}/clientes/${id}`);
  }

  findByEmail(email: string): Observable<any> {
    return this.http.get<any>(`${API_CONFIG.baseUrl}/clientes/email?email=${email}`);
  }

  getImageFromBucket(id: string): Observable<any> {
    let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`;
    return this.http.get(url, {responseType: 'blob'});
  }

  insert(obj: ClienteDTO) {
    return this.http.post(`${API_CONFIG.baseUrl}/clientes`, obj,
      {
        observe: 'response',
        responseType: 'text',
      });
  }
}
