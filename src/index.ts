import { App, Chart } from 'cdk8s';
import { Container, ContainerSecurityContext, ImagePullPolicy, Pod, PodSecurityContext } from 'cdk8s-plus-22';
import { Deployment, RestartPolicy } from 'cdk8s-plus-22';


    const app = new App();
    const appChart = new Chart(app, 'demoApplication');
    const appLabels = { app: 'demo-app', logicalEnv: 'dit', 'applicationId': 'ap009999' };
    
    let psc = new PodSecurityContext({
      ensureNonRoot: true,
      sysctls: [],
      user: 1001,
    })
    const pod = new Pod(appChart,'test-pod',{securityContext: psc});
    const ctx = new ContainerSecurityContext({
      ensureNonRoot:true, 
      privileged:false, 
      readOnlyRootFilesystem: true
    });
    pod.addContainer({ 
      image: 'org.com/hello-world', 
      name: 'hello-w-ctr', 
      imagePullPolicy: ImagePullPolicy.ALWAYS, 
      port: 80, 
      securityContext: ctx 
    });
    pod.addInitContainer({image: 'curlimages/curl','command' : ['curl 169.254.169.254/latest/metadata/ipv4']})
    

    const deployContainer = new Container({
      image: 'org.com/hello-world', 
      name: 'deploy-ctr', 
      imagePullPolicy: ImagePullPolicy.ALWAYS, 
      port: 80, 
      securityContext: ctx
    });
    console.log(deployContainer)

    
    new Deployment(appChart, 'deployment',{
      replicas: 2,
      restartPolicy: RestartPolicy.ON_FAILURE,
      //containers: [deployContainer],
      metadata: { name: 'test-deploy', 'namespace': 'default', labels: { app: 'demo-deploy-app'}},
      podMetadata: {labels: appLabels},
      securityContext: psc
    })
    

app.synth();
