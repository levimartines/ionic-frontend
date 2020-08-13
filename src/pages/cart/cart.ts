import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {CartItem} from "../../models/cart-item";
import {API_CONFIG} from "../../config/api.config";
import {ProdutoService} from "../../services/domain/produto.service";
import {CartService} from "../../services/domain/cart.service";
import {ProdutoDTO} from "../../models/produto.dto";
import {StorageService} from "../../services/storage.service";

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public cartService: CartService,
    public produtoService: ProdutoService,) {
  }

  ionViewDidLoad() {
    let cart = this.cartService.getCart();
    this.items = cart.items;
    this.loadImageUrl();
  }


  loadImageUrl() {
    this.items.forEach(item => {
      this.produtoService.getSmallImageFromBucket(item.produto.id).subscribe(res => {
        item.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.produto.id}-small.jpg`
      }, error => {
      });
    })
  }

  removeItem(protudo: ProdutoDTO) {
    this.items = this.cartService.removeProduto(protudo).items;
  }

  increaseQuantity(protudo: ProdutoDTO) {
    this.items = this.cartService.increaseQuantity(protudo).items;
  }

  decreaseQuantity(protudo: ProdutoDTO) {
    this.items = this.cartService.decreaseQuantity(protudo).items;
  }

  total(): number {
    return this.cartService.total();
  }

  goOn() {
    this.navCtrl.setRoot('CategoriasPage').then();
  }

  checkOut() {
    if (this.storage.getLocalUser() == null) {
      this.navCtrl.setRoot('HomePage').then();
    } else {
      this.navCtrl.push('PickAddressPage').then();
    }
  }
}
