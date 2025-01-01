#!/bin/bash
docker-compose up -d
echo "Starting database"
# A script to make sure all services active. Copied using curl  https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
./wait-for-it.sh "postgresql://postgres:helloworld@localhost:5432/test" -- echo '🟢 - Database is ready!' 
npx prisma migrate dev --name init
npm run test
docker-compose down