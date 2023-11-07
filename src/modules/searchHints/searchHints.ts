import { Component } from '../component';
import { ProductList } from '../productList/productList';
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
        const allHint = document.querySelectorAll('.searchHints__wrapper')
        this.hints.update(products);

        for (let i = 0; i < allHint.length; i++) {
            const hintText = allHint[i].querySelector<HTMLElement>('.searchHints__hint')
            allHint[i].setAttribute('href', `/product?id=${this.hints.products[i].id}`)
            if (hintText) {
                hintText.innerText = products[i].name
            }
        }
    }
}

export const searchHintComp = new SearchHint(html)
