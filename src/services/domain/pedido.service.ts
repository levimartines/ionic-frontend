import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {API_CONFIG} from "../../config/api.config";
import {Observable} from "rxjs/Rx";
import {PedidoDTO} from "../../models/pedido.dto";

@Injectable()
export class PedidoService {

  constructor(public http: HttpClient) {
  }

  insert(pedido: PedidoDTO): Observable<any> {
    return this.http.post(`${API_CONFIG.baseUrl}/pedidos`, pedido, {
      observe: 'response',
      responseType: 'text'
    });
  }
}
