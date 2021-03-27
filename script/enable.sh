#!/bin/bash

npm run build
scp -r build/* root@192.168.88.100:/var/www/thehome/html/