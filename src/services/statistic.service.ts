type StatisticData = {
    payload: object,
    event: string,
    timestamp: number,
}

class StatisticService {
    async routeEvent(url: any, event: string, timestamp: number) {
        const request = {
            event: event,
            payload: { url },
            timestamp: timestamp,
        }
        this.sendStatistic(request)
    }
    async productEvent(product: any, event: string, timestamp: number, secretKey: string) {
        const request = {
            event: event,
            payload: { product, secretKey },
            timestamp: timestamp,
        }
        this.sendStatistic(request)
    }
    async addToCartEvent(product: any, event: string, timestamp: number) {
        const request = {
            event: event,
            payload: { product },
            timestamp: timestamp,
        }
        this.sendStatistic(request)
    }
    async purchaseEvent(event: string, timestamp: number, orderID: string, products: any) {
        const productIds = products.map((item: { id: number }) => item.id)
        const totalPrice = products.reduce((acc: number, product: { salePriceU: number }) => (acc += product.salePriceU), 0)
        const request = {
            event: event,
            payload: {
                orderID,
                totalPrice,
                productIds
            },
            timestamp: timestamp,
        }
        console.log(products)
        this.sendStatistic(request)
    }


    private async sendStatistic(data: StatisticData) {
        fetch('/api/sendEvent', {
            method: 'POST',
            body: JSON.stringify(data),
        });
        console.log(data)
    }
}

export const statisticService = new StatisticService()