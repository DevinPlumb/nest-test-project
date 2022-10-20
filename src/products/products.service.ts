import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
    private products: Product[] = []
    insertProduct(title: string, description: string, price: number) {
        const id = Math.random().toString()
        const newProduct = new Product(id, title, description, price)
        this.products.push(newProduct)
        return id
    }

    getProducts() {
        return [...this.products]
    }

    getProduct(id: string) {
        const product = this.findProduct(id)[0]
        return {...product}
    }

    updateProduct(id: string, title: string, description: string, price: number) {
        const [product, index] = this.findProduct(id)
        const updatedProduct = {...product}
        if (title) {
            updatedProduct.title = title
        }
        if (description) {
            updatedProduct.description = description
        }
        if (price) {
            updatedProduct.price = price
        }
        this.products[index] = updatedProduct
        return updatedProduct
    }

    deleteProduct(id: string) {
        const index = this.findProduct(id)[1]
        this.products.splice(index, 1)
    }

    private findProduct(id: string): [Product, number] {
        const productIndex = this.products.findIndex(product => product.id === id)
        const product = this.products[productIndex]
        if (!product) {
            throw new NotFoundException
        }
        return [product, productIndex]
    }
}
