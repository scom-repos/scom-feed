import { Module, customModule, Container } from '@ijstech/components';
import ScomFeed from '@scom/scom-feed';

@customModule
export default class Module1 extends Module {
    constructor(parent?: Container, options?: any) {
        super(parent, options);
    }

    init() {
        super.init();
    }

    render() {
        return <i-vstack margin={{left: 'auto', right: 'auto'}} maxWidth={960}>
            <i-scom-feed
                cids={[
                    'bafybeibilgbhh65vc2ak3qrhvb2653td6agfzto3253xaqhe76ukfnwyr4',
                    'bafybeibilgbhh65vc2ak3qrhvb2653td6agfzto3253xaqhe76ukfnwyr2'
                ]}

            />
        </i-vstack>
    }
}