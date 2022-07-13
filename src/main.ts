import { Construct } from 'constructs';
import { App, Chart } from 'cdk8s';
import {KubeDeployment, KubePod, KubeService, Quantity} from '../imports/k8s'

export class MyChart extends Chart {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    const labels = { app: 'demo-app', logicalEnv: 'dit', 'applicationId': 'ap009999' };

    new KubePod(this, 'hello-world-pod',{
      spec: {
        containers: [ { name: 'hello', image: 'myorg.com/hello-world:latest' } ]
      }
    });

    new KubeService(this, 'service', {
      metadata: { labels },
      spec: {
        type: 'LoadBalancer',
        ports: [ { port: 80 } ],
        selector: labels,
      }
    });

    let cpuReq = Quantity.fromNumber(0.2); 
    let cpuLimit = Quantity.fromString('1500m');
    let memReq = Quantity.fromString('400Mi');
    let memLimit = Quantity.fromString('2000Mi'); 
    new KubeDeployment(this, 'deployment', {
      spec: {
        selector: { matchLabels: labels },
        replicas: 3,
        template: {
          metadata: { labels },
          spec: {
            containers: [
              {
                name: 'hellow-ctr',
                image: 'myorg.com/hello-world:latest',
                ports: [{ containerPort: 80 }],
                resources: { requests: { cpu: cpuReq, memory: memReq},
                             limits: { cpu: cpuLimit, memory: memLimit},
                           }
              }
            ]
          }
        }
      }
    });

  }
}

const app = new App();
new MyChart(app, 'test');
app.synth();
