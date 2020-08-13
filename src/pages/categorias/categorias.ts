import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {CategoriaService} from "../../services/domain/categoria.service";
import {CategoriaDTO} from "../../models/categoria.dto";
import {API_CONFIG} from "../../config/api.config";

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  items: CategoriaDTO[];
  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public categoriaService: CategoriaService,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    let loader = this.presentLoading();
    this.categoriaService.findAll().subscribe(
      res => {
        this.items = res;
        loader.dismiss().then();
      }, err => {
        loader.dismiss().then();
      }
    );
  }

  showProdutos(categoria_id: string) {
    this.navCtrl.push('ProdutosPage', {categoria_id});
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Carregando..."
    });
    loader.present().then();
    return loader;
  }
}
