type StatisticData = {
    event: string | null,
    payload: Object | null,
    timestamp: number | null,
}

class StatisticService {
    async makeRequest(event: string, timestamp: number, url?: any, product?: any, secretKey?: any, orderID?: any, products?: any) {
        let request
        switch (event) {
            case 'route':
                request = {
                    event: event,
                    payload: { url },
                    timestamp: timestamp,
                }
                this.sendStatistic(request)
                break;
            case 'viewCard':
                request = {
                    event: event,
                    payload: { product, secretKey },
                    timestamp: timestamp,
                }
                this.sendStatistic(request)
                break;
            case 'viewCardPromo':
                request = {
                    event: event,
                    payload: { product, secretKey },
                    timestamp: timestamp,
                }
                this.sendStatistic(request)
                break;
            case 'addToCart':
                request = {
                    event: event,
                    payload: { product },
                    timestamp: timestamp,
                }
                this.sendStatistic(request)
                break;
            case 'purchase':
                const productIds = products.map((item: { id: number }) => item.id)
                const totalPrice = products.reduce((acc: number, product: { salePriceU: number }) => (acc += product.salePriceU), 0)
                request = {
                    event: event,
                    payload: {
                        orderID,
                        totalPrice,
                        productIds
                    },
                    timestamp: timestamp,
                }
                this.sendStatistic(request)
                break;
        }
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