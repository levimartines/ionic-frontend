import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ProdutoDTO} from "../../models/produto.dto";
import {ProdutoService} from "../../services/domain/produto.service";
import {API_CONFIG} from "../../config/api.config";

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {
  items: ProdutoDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
  ) {
  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('categoria_id');
    if (!categoria_id) {
      categoria_id = 1;
    }
    this.produtoService.findByCategoria(categoria_id).subscribe(res => {
      this.items = res['content'];
      this.loadImageUrl();
    });
  }

  showDetail(produto_id: string) {
    this.navCtrl.push('ProdutoDetailPage', {produto_id});
  }

  loadImageUrl() {
    this.items.forEach(item => {
      this.produtoService.getSmallImageFromBucket(item.id).subscribe(res => {
        item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`
      }, error => {
      });
    })
  }

}
