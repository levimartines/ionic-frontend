import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CidadeService} from "../../services/domain/cidade.service";
import {EstadoService} from "../../services/domain/estado.service";
import {EstadoDTO} from "../../models/estado.dto";
import {CidadeDTO} from "../../models/cidade.dto";
import {ClienteService} from "../../services/domain/cliente.service";

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public clienteService: ClienteService,
  ) {
    this.formGroup = formBuilder.group({
      nome: ['Admin', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['admin@admin.com', [Validators.required, Validators.email]],
      tipo: ['1', [Validators.required]],
      cpfOuCnpj: ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha: ['123', [Validators.required]],
      logradouro: ['Rua Via', [Validators.required]],
      numero: ['25', [Validators.required]],
      complemento: ['Apto 3', []],
      bairro: ['Copacabana', []],
      cep: ['10828333', [Validators.required]],
      telefone1: ['977261827', [Validators.required]],
      telefone2: ['', []],
      telefone3: ['', []],
      estadoId: [null, [Validators.required]],
      cidadeId: [null, [Validators.required]]
    });
  }

  ionViewDidLoad() {
    this.estadoService.findAll().subscribe(res => {
      this.estados = res;
      this.formGroup.controls.estadoId.setValue(this.estados[0].id);
      this.updateCidades();
    }, error => {
    })
  }

  updateCidades() {
    let estadoId = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estadoId).subscribe(res => {
      this.cidades = res;
      this.formGroup.controls.cidadeId.setValue(null);
    }, error => {
    })
  }

  signupUser() {
    this.clienteService.insert(this.formGroup.value).subscribe(res => {
      this.showInsertSuccess();
    }, error => {
    });
  }

  private showInsertSuccess() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

}
