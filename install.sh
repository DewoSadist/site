#git pull origin kubernetes_deploy

./build-docker.sh $1

./deploy-docker.sh webfront:$1
