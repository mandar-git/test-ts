"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyChart = void 0;
const cdk8s_1 = require("cdk8s");
const k8s_1 = require("../imports/k8s");
class MyChart extends cdk8s_1.Chart {
    constructor(scope, id) {
        super(scope, id);
        const labels = { app: 'demo-app', logicalEnv: 'dit', 'applicationId': 'ap009999' };
        new k8s_1.KubePod(this, 'hello-world-pod', {
            spec: {
                containers: [{ name: 'hello', image: 'myorg.com/hello-world:latest' }]
            }
        });
        new k8s_1.KubeService(this, 'service', {
            metadata: { labels },
            spec: {
                type: 'LoadBalancer',
                ports: [{ port: 80 }],
                selector: labels,
            }
        });
        let cpuReq = k8s_1.Quantity.fromNumber(0.2);
        let cpuLimit = k8s_1.Quantity.fromString('1500m');
        let memReq = k8s_1.Quantity.fromString('400Mi');
        let memLimit = k8s_1.Quantity.fromString('2000Mi');
        new k8s_1.KubeDeployment(this, 'deployment', {
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
                                resources: { requests: { cpu: cpuReq, memory: memReq },
                                    limits: { cpu: cpuLimit, memory: memLimit },
                                }
                            }
                        ]
                    }
                }
            }
        });
    }
}
exports.MyChart = MyChart;
const app = new cdk8s_1.App();
new MyChart(app, 'test');
app.synth();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsaUNBQW1DO0FBQ25DLHdDQUE2RTtBQUU3RSxNQUFhLE9BQVEsU0FBUSxhQUFLO0lBQ2hDLFlBQVksS0FBZ0IsRUFBRSxFQUFVO1FBQ3RDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakIsTUFBTSxNQUFNLEdBQUcsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxDQUFDO1FBRW5GLElBQUksYUFBTyxDQUFDLElBQUksRUFBRSxpQkFBaUIsRUFBQztZQUNsQyxJQUFJLEVBQUU7Z0JBQ0osVUFBVSxFQUFFLENBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSw4QkFBOEIsRUFBRSxDQUFFO2FBQ3pFO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsSUFBSSxpQkFBVyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUU7WUFDL0IsUUFBUSxFQUFFLEVBQUUsTUFBTSxFQUFFO1lBQ3BCLElBQUksRUFBRTtnQkFDSixJQUFJLEVBQUUsY0FBYztnQkFDcEIsS0FBSyxFQUFFLENBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUU7Z0JBQ3ZCLFFBQVEsRUFBRSxNQUFNO2FBQ2pCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsSUFBSSxNQUFNLEdBQUcsY0FBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN0QyxJQUFJLFFBQVEsR0FBRyxjQUFRLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzVDLElBQUksTUFBTSxHQUFHLGNBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDMUMsSUFBSSxRQUFRLEdBQUcsY0FBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM3QyxJQUFJLG9CQUFjLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRTtZQUNyQyxJQUFJLEVBQUU7Z0JBQ0osUUFBUSxFQUFFLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBRTtnQkFDakMsUUFBUSxFQUFFLENBQUM7Z0JBQ1gsUUFBUSxFQUFFO29CQUNSLFFBQVEsRUFBRSxFQUFFLE1BQU0sRUFBRTtvQkFDcEIsSUFBSSxFQUFFO3dCQUNKLFVBQVUsRUFBRTs0QkFDVjtnQ0FDRSxJQUFJLEVBQUUsWUFBWTtnQ0FDbEIsS0FBSyxFQUFFLDhCQUE4QjtnQ0FDckMsS0FBSyxFQUFFLENBQUMsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLENBQUM7Z0NBQzlCLFNBQVMsRUFBRSxFQUFFLFFBQVEsRUFBRSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQztvQ0FDeEMsTUFBTSxFQUFFLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFDO2lDQUMzQzs2QkFDYjt5QkFDRjtxQkFDRjtpQkFDRjthQUNGO1NBQ0YsQ0FBQyxDQUFDO0lBRUwsQ0FBQztDQUNGO0FBL0NELDBCQStDQztBQUVELE1BQU0sR0FBRyxHQUFHLElBQUksV0FBRyxFQUFFLENBQUM7QUFDdEIsSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3pCLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0IHsgQXBwLCBDaGFydCB9IGZyb20gJ2NkazhzJztcbmltcG9ydCB7S3ViZURlcGxveW1lbnQsIEt1YmVQb2QsIEt1YmVTZXJ2aWNlLCBRdWFudGl0eX0gZnJvbSAnLi4vaW1wb3J0cy9rOHMnXG5cbmV4cG9ydCBjbGFzcyBNeUNoYXJ0IGV4dGVuZHMgQ2hhcnQge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkKTtcbiAgICBjb25zdCBsYWJlbHMgPSB7IGFwcDogJ2RlbW8tYXBwJywgbG9naWNhbEVudjogJ2RpdCcsICdhcHBsaWNhdGlvbklkJzogJ2FwMDA5OTk5JyB9O1xuXG4gICAgbmV3IEt1YmVQb2QodGhpcywgJ2hlbGxvLXdvcmxkLXBvZCcse1xuICAgICAgc3BlYzoge1xuICAgICAgICBjb250YWluZXJzOiBbIHsgbmFtZTogJ2hlbGxvJywgaW1hZ2U6ICdteW9yZy5jb20vaGVsbG8td29ybGQ6bGF0ZXN0JyB9IF1cbiAgICAgIH1cbiAgICB9KTtcblxuICAgIG5ldyBLdWJlU2VydmljZSh0aGlzLCAnc2VydmljZScsIHtcbiAgICAgIG1ldGFkYXRhOiB7IGxhYmVscyB9LFxuICAgICAgc3BlYzoge1xuICAgICAgICB0eXBlOiAnTG9hZEJhbGFuY2VyJyxcbiAgICAgICAgcG9ydHM6IFsgeyBwb3J0OiA4MCB9IF0sXG4gICAgICAgIHNlbGVjdG9yOiBsYWJlbHMsXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBsZXQgY3B1UmVxID0gUXVhbnRpdHkuZnJvbU51bWJlcigwLjIpOyBcbiAgICBsZXQgY3B1TGltaXQgPSBRdWFudGl0eS5mcm9tU3RyaW5nKCcxNTAwbScpO1xuICAgIGxldCBtZW1SZXEgPSBRdWFudGl0eS5mcm9tU3RyaW5nKCc0MDBNaScpO1xuICAgIGxldCBtZW1MaW1pdCA9IFF1YW50aXR5LmZyb21TdHJpbmcoJzIwMDBNaScpOyBcbiAgICBuZXcgS3ViZURlcGxveW1lbnQodGhpcywgJ2RlcGxveW1lbnQnLCB7XG4gICAgICBzcGVjOiB7XG4gICAgICAgIHNlbGVjdG9yOiB7IG1hdGNoTGFiZWxzOiBsYWJlbHMgfSxcbiAgICAgICAgcmVwbGljYXM6IDMsXG4gICAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgICAgbWV0YWRhdGE6IHsgbGFiZWxzIH0sXG4gICAgICAgICAgc3BlYzoge1xuICAgICAgICAgICAgY29udGFpbmVyczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJ2hlbGxvdy1jdHInLFxuICAgICAgICAgICAgICAgIGltYWdlOiAnbXlvcmcuY29tL2hlbGxvLXdvcmxkOmxhdGVzdCcsXG4gICAgICAgICAgICAgICAgcG9ydHM6IFt7IGNvbnRhaW5lclBvcnQ6IDgwIH1dLFxuICAgICAgICAgICAgICAgIHJlc291cmNlczogeyByZXF1ZXN0czogeyBjcHU6IGNwdVJlcSwgbWVtb3J5OiBtZW1SZXF9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaW1pdHM6IHsgY3B1OiBjcHVMaW1pdCwgbWVtb3J5OiBtZW1MaW1pdH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcblxuICB9XG59XG5cbmNvbnN0IGFwcCA9IG5ldyBBcHAoKTtcbm5ldyBNeUNoYXJ0KGFwcCwgJ3Rlc3QnKTtcbmFwcC5zeW50aCgpO1xuIl19