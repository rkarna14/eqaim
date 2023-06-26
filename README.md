# eqaim

1. Makes sure docker and docker compose are installed in the system
2. Run command:
   docker compose up
3. This should run client, server and database containers
4. Client is accessible at:
   http://localhost:3000
5. Server is accessible at:
   http://localhost:9000

# For paginated post request:
curl 'http://localhost:9000/steps?pageSize=5&pageNum=1'
