import {Injectable} from "@angular/core";
import {StorageService} from "../storage.service";
import {Cart} from "../../models/cart";
import {ProdutoDTO} from "../../models/produto.dto";

@Injectable()
export class CartService {
  constructor(
    public storage: StorageService,
  ) {
  }

  getCart(): Cart {
    let cart: Cart = this.storage.getCart();
    if (cart == null) {
      cart = this.createOrClearCart();
    }
    return cart;
  }

  addProduto(produto: ProdutoDTO): Cart {
    let cart: Cart = this.getCart();
    let position = this.findIndexOfProduto(produto);
    if (position == -1) {
      cart.items.push({quantity: 1, produto});
    }
    this.storage.setCart(cart);
    return cart;
  }

  increaseQuantity(produto: ProdutoDTO): Cart {
    let cart: Cart = this.getCart();
    let position = this.findIndexOfProduto(produto);
    if (position != -1) {
      cart.items[position].quantity++;
    }
    this.storage.setCart(cart);
    return cart;
  }

  decreaseQuantity(produto: ProdutoDTO): Cart {
    let cart: Cart = this.getCart();
    let position = this.findIndexOfProduto(produto);
    if (position != -1) {
      cart.items[position].quantity--;
      if (cart.items[position].quantity < 1) {
        cart = this.removeProduto(produto);
      }
    }
    this.storage.setCart(cart);
    return cart;
  }

  removeProduto(produto: ProdutoDTO): Cart {
    let cart: Cart = this.getCart();
    let position = this.findIndexOfProduto(produto);
    if (position != -1) {
      cart.items.splice(position, 1);
    }
    this.storage.setCart(cart);
    return cart;
  }

  total() {
    let cart: Cart = this.getCart();
    let sum = 0;
    cart.items.forEach(prod => {
      sum += prod.produto.preco * prod.quantity;
    })
    return sum;
  }

  private findIndexOfProduto(produto: ProdutoDTO): number {
    let cart: Cart = this.getCart();
    return cart.items.findIndex(prod => prod.produto.id == produto.id);
  }

  createOrClearCart(): Cart {
    let cart: Cart = {
      items: [],
    }
    this.storage.setCart(cart);
    return cart;
  }
}
