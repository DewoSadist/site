docker_tag=$1

server="docker.homebank.kz"
docker login https://docker.homebank.kz  -u doryuser1 -p SklQL9wU7t2Cwrjnbzf4

docker tag  $docker_tag  $server/$docker_tag
docker push  $server/$docker_tag