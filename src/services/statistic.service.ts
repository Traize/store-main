
class StatisticService {
    async sendStatistic(payload: any, event: string) {
        switch (event) {
            case 'route':
                fetch('/api/sendEvent', {
                    method: 'POST',
                    body: JSON.stringify(payload),

                });
                console.log(JSON.stringify(Date.now()))
                console.log(event)
                console.log(payload)
                break;
            // case 'viewCard':
            //     fetch('/api/sendEvent', {
            //         method: 'POST',
            //         body: JSON.stringify(payload),
            //     });
            //     break;
            // case 'viewCardPromo':
            //     fetch('/api/sendEvent', {
            //         method: 'POST',
            //         body: JSON.stringify(payload),
            //     });
            //     break;
            // case 'addToCard':
            //     fetch('/api/sendEvent', {
            //         method: 'POST',
            //         body: JSON.stringify(payload),

            //     });
            //     break;
            // case 'purchase':
            //     fetch('/api/sendEvent', {
            //         method: 'POST',
            //         body: JSON.stringify(payload),

            //     });
            //     break;

            default:
                break;
        }

    }

}

export const statisticService = new StatisticService()