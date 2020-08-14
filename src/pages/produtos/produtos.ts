import {Component} from '@angular/core';
import {
  InfiniteScroll,
  IonicPage,
  LoadingController,
  NavController,
  NavParams,
  Refresher
} from 'ionic-angular';
import {ProdutoDTO} from "../../models/produto.dto";
import {ProdutoService} from "../../services/domain/produto.service";
import {API_CONFIG} from "../../config/api.config";

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {
  items: ProdutoDTO[] = [];
  page: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    let categoria_id = this.navParams.get('categoria_id');
    if (!categoria_id) {
      categoria_id = 1;
    }

    let loader = this.presentLoading();
    this.produtoService.findByCategoria(categoria_id, this.page).subscribe(res => {
      let start = this.items.length;
      this.items = this.items.concat(res['content'] as ProdutoDTO[]);
      let end = this.items.length - 1;
      console.log(this.items)
      loader.dismiss().then();
      this.loadImageUrl(start, end);
    }, error => {
      loader.dismiss().then();
    });
  }

  showDetail(produto_id: string) {
    this.navCtrl.push('ProdutoDetailPage', {produto_id}).then();
  }

  loadImageUrl(start: number, end: number) {

    for (let i = start; i <= end; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id).subscribe(res => {
        item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`
      }, error => {
      });
    }
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Carregando..."
    });
    loader.present().then();
    return loader;
  }

  doRefresh(refresher: Refresher) {
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll: InfiniteScroll) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }
}
