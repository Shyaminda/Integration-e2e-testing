set -e
docker-compose up -d
echo '🟡 - Waiting for database to be ready...'
./scripts/wait-for-it.sh "postgresql://postgres:mysecretpassword@localhost:5432/postgres" -- echo '🟢 - Database is ready!'
npx prisma migrate dev --name init
npm run test || TEST_EXIT_CODE=$?
docker-compose down
exit ${TEST_EXIT_CODE:-0}