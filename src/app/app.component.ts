import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AuthService} from "../services/auth.service";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'HomePage';
  pages: Array<{ title: string, component: string }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public auth: AuthService
  ) {
    this.initializeApp();
    this.pages = [
      {title: 'Profile', component: 'ProfilePage'},
      {title: 'Categorias', component: 'CategoriasPage'},
      {title: 'Logout', component: ''}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page: { title: string, component: string }) {
    if (page.title == 'Logout') {
      this.auth.logout();
      this.nav.setRoot('HomePage').then();
    } else {
      this.nav.setRoot(page.component).then();
    }
  }

}
