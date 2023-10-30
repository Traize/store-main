import { Component } from "../component";
import { Product } from "../product/product";
import html from './favorite.tpl.html';
import { favoriteService } from "../../services/favorite.service";
import { ProductData } from "types";

class Favorite extends Component {
    products!: ProductData[];

    async render() {
        this.products = await favoriteService.get()

        if (this.products.length < 1) {
            this.view.root.classList.add('is__empty');
            return;
        }

        this.products.forEach((product) => {
            const productComp = new Product(product);
            productComp.render();
            productComp.attach(this.view.cart);
            console.log(this.view)
        });
    }
}

export const favoriteComp = new Favorite(html);