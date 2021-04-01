development:
     npm run start

build and upload:
    npm run build
    scp -r build/* root@192.168.88.100:/var/www/thehome/html/

storybook:
    npm run storybook

i18:
    npm run extract
    npm run compile
