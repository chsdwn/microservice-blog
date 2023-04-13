# Microservice Blog

## Kubernetes Notes

### Terminology

- Kubernetes Cluster: a collections of nodes + a master to manage them.
- Node: a virtual machine that will run our containers.
- Pod: more or less a running container. can run multiple containers(anti-pattern).
- Deployment: monitors a set of pods, make sure they are running and restarts them if they crash.
- Service: provides an easy-to-remember URL to access a running container.

### Using Local Docker Images with Minikube

- Delete pods: `$ kubectl delefe -f infra/k8s/`.
- Add `imagePullPolicy: Never` to container definitions.
- Run `$ eval $(minikube docker-env)`.
- Build images again `$ docker build -t microservice-blog/posts .`.
- Generate pods: `$ kubectl apply -f infra/k8s/`

### Common Commands

- `kubectl get pods`: st atus of running pods
- `kubectl exec -it <pod_name> <cmd>`: execute the given command in the given pod
- `kubectl logs <pod_name>`: logs of the given pod
- `kubectl delete pod <pod_name>`: deletes given pod
- `kubectl apply -f <path/config_file.yaml>`: process the config
- `kubectl describe pod <pod_name>`: information about the given pod

### Deployment Commands

- `$ kubectl get deployments`: list of running deployments
- `$ kubectl describe deployment <depl_name>`: details about the given deployment
- `$ kubectl apply -f <path/config_file.yaml>`: create a deployment out of a config file
- `$ kubectl delete deployment <depl_name>`: delete the given deployment

### Updating the Image Used by A Deployment

- The deployment must be using the latest tag.
- Rebuild image.
- `$ kubectl rollout restart deployment <depl_name>`

### Minikube Accessing Apps

- `$ minikube service <service_name> --url`
