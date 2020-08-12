import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ProdutoDTO} from "../../models/produto.dto";
import {API_CONFIG} from "../../config/api.config";
import {ProdutoService} from "../../services/domain/produto.service";
import {CartService} from "../../services/domain/cart.service";

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {
  item: ProdutoDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    let produto_id = this.navParams.get('produto_id');
    if (!produto_id) {
      produto_id = 1;
    }
    this.produtoService.findById(produto_id).subscribe(res => {
      this.item = res;
      this.getImageUrl();
    }, error => {
    })
  }

  addToCart(produto: ProdutoDTO) {
    this.cartService.addProduto(produto);
    this.navCtrl.setRoot('CartPage').then();
  }

  getImageUrl() {
    this.produtoService.getImageFromBucket(this.item.id).subscribe(res => {
      this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}-small.jpg`
    }, error => {
    });
  }
}
