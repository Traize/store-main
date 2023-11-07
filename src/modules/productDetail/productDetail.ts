import { Component } from '../component';
import { ProductList } from '../productList/productList';
import { formatPrice } from '../../utils/helpers';
import { ProductData } from 'types';
import html from './productDetail.tpl.html';
import { cartService } from '../../services/cart.service';
import { statisticService } from '../../services/statistic.service';

class ProductDetail extends Component {
  more: ProductList;
  product?: ProductData;

  constructor(props: any) {
    super(props);

    this.more = new ProductList();
    this.more.attach(this.view.more);
  }

  async render() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = Number(urlParams.get('id'));
    const productResp = await fetch(`/api/getProduct?id=${productId}`);
    this.product = await productResp.json();

    if (!this.product) return;

    const { id, src, name, description, salePriceU } = this.product;

    this.view.photo.setAttribute('src', src);
    this.view.title.innerText = name;
    this.view.description.innerText = description;
    this.view.price.innerText = formatPrice(salePriceU);
    this.view.btnBuy.onclick = this._addToCart.bind(this);

    const isInCart = await cartService.isInCart(this.product);
    this.view.delBtn.onclick = this._deleteFromCart.bind(this)

    if (isInCart) this._setInCart();

    fetch(`/api/getProductSecretKey?id=${id}`)
      .then((res) => res.json())
      .then((secretKey) => {
        this.view.secretKey.setAttribute('content', secretKey);
        statisticService.makeRequest(this.product?.log?.cpm ? 'viewCardPromo' : 'viewCard', Date.now(), null, this.product, secretKey) // Проверка через полей в log
      })

    fetch('/api/getPopularProducts')
      .then((res) => res.json())
      .then((products) => {
        this.more.update(products);
      });
  }

  private _addToCart() {
    if (!this.product) return;

    cartService.addProduct(this.product);
    this._setInCart();
    statisticService.makeRequest('addToCart', Date.now(), null, this.product)
  }

  private _setInCart() {
    this.view.btnBuy.innerText = '✓ В корзине';
    this.view.btnBuy.disabled = true;
    this.view.delBtn.style.visibility = 'visible'
  }

  private _deleteFromCart() {
    if (!this.product) return
    cartService.removeProduct(this.product)
    this.view.btnBuy.innerText = 'В корзину';
    this.view.btnBuy.disabled = false;
    this.view.delBtn.style.visibility = 'hidden'
  }
}

export const productDetailComp = new ProductDetail(html);
