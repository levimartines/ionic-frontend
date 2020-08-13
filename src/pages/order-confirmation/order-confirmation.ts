import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {PedidoDTO} from "../../models/pedido.dto";
import {CartItem} from "../../models/cart-item";
import {CartService} from "../../services/domain/cart.service";
import {ClienteDTO} from "../../models/cliente.dto";
import {EnderecoDTO} from "../../models/endereco.dto";
import {ClienteService} from "../../services/domain/cliente.service";
import {PedidoService} from "../../services/domain/pedido.service";

@IonicPage()
@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  pedido: PedidoDTO;
  cliente: ClienteDTO;
  endereco: EnderecoDTO;
  cartItems: CartItem[];

  totalPedido: number;
  codpedido: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cartService: CartService,
    public clienteService: ClienteService,
    public pedidoService: PedidoService) {

    this.pedido = this.navParams.get('pedido');
  }

  ionViewDidLoad() {
    this.cartItems = this.cartService.getCart().items;

    this.clienteService.findById(this.pedido.cliente.id).subscribe(res => {
      this.cliente = res as ClienteDTO;
      this.endereco = this.findEndereco(res['enderecos']);
      this.totalPedido = this.cartService.total();
    }, err => {
      this.navCtrl.setRoot('HomePage').then();
    })
  }

  private findEndereco(list: EnderecoDTO[]): EnderecoDTO {
    let position = list.findIndex(obj => obj.id == this.pedido.enderecoDeEntrega.id);
    return list[position];
  }

  checkout() {
    this.pedidoService.insert(this.pedido).subscribe(res => {
      this.cartService.createOrClearCart();
      this.codpedido = OrderConfirmationPage.extractId(res.headers.get('location'));
    }, err => {
      if (err.status == 403) {
        this.navCtrl.setRoot('HomePage').then();
      }
    })
  }

  back() {
    this.navCtrl.setRoot('CartPage').then();
  }

  home() {
    this.navCtrl.setRoot('CategoriasPage').then();
  }

  private static extractId(location: string): string {
    let position = location.lastIndexOf('/');
    return location.substring(position + 1, location.length);
  }
}
