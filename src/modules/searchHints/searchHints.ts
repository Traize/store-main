import { Component } from "../component";
import { ProductList } from "../productList/productList";
import html from './searchHints.tpl.html';

class SearchHint extends Component {
    hints: ProductList;


    constructor(props: any) {
        super(props);
        this.hints = new ProductList();
    }
    attach($root: HTMLElement) {
        $root.appendChild(this.view.root);
    }

    async render() {
        const productsResp = await fetch('/api/getPopularProducts');
        const products = await productsResp.json();
        this.hints.update(products);

        this.view.firstHintText.innerText = this.hints.products[0].name
        this.view.firstHint.setAttribute('href', `/product?id=${this.hints.products[0].id}`)
        this.view.secondHintText.innerText = this.hints.products[1].name
        this.view.secondHint.setAttribute('href', `/product?id=${this.hints.products[1].id}`)
        this.view.thirdHintText.innerText = this.hints.products[2].name
        this.view.thirdHint.setAttribute('href', `/product?id=${this.hints.products[2].id}`)
    }
}

export const searchHintComp = new SearchHint(html)
