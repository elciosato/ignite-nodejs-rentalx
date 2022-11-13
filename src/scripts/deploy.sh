#!/bin/bash

cd ~/rentalx
git pull
npm i
npm run build
npx typeorm -d dist/infra/typeORM/database/DataSource.js migration:run
pm2 restart rentalx-api