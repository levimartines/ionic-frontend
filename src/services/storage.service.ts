import {Injectable} from "@angular/core";
import {LocalUser} from "../models/local-user";
import {STORAGE_KEYS} from "../config/storage_keys.config";
import {Cart} from "../models/cart";

@Injectable()
export class StorageService {

  getLocalUser(): LocalUser {
    let usr = localStorage.getItem(STORAGE_KEYS.localUser);
    if (usr == null) {
      return null;
    } else {
      return JSON.parse(usr);
    }
  }

  setLocalUser(user: LocalUser) {
    if (user == null) {
      localStorage.removeItem(STORAGE_KEYS.localUser);
    } else {
      localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(user));
    }
  }

  getCart(): Cart {
    let cart = localStorage.getItem(STORAGE_KEYS.cart);
    if (cart == null) {
      return null;
    } else {
      return JSON.parse(cart);
    }
  }

  setCart(cart: Cart) {
    if (cart == null) {
      localStorage.removeItem(STORAGE_KEYS.cart);
    } else {
      localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
    }
  }
}
