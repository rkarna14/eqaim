# eqaim

1. Clone the repository
2. Run command:
   ```cd eqaim```
3. Makes sure docker and docker compose are installed in the system
4. Run command, by being in eqaim directory
   ```docker compose up```
5. This should run client, server and database containers
6. Client is accessible at:
   http://localhost:3000
7. Server is accessible at:
   http://localhost:9000

# For paginated post request:

curl 'http://localhost:9000/steps?pageSize=5&pageNum=1'
