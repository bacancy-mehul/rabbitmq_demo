
# Getting Started


## User Service

Open User Service folder in IDE.

Create `.env` file

Paste Below Values



```javascript
PORT = 1234
MONGO_URI = "mongodb://localhost:27017/rabbitMq_regisetr"
AMQP_SERVER = "amqp://localhost:5672"
```

You can Use Mongo Atlas Url. I have used local one.

You have to run Your RabbitMQ Server locally ad put that in AMQP_SERVER. I have used Docker Image so you can use that also.

## Rabbitmq server docker
```bash
docker run --name rabbitmq -p 5672:5672 -d rabbitmq
```

Do the same process for register service
Create `.env` file

```javascript
PORT = 4567
MONGO_URI = "mongodb://localhost:27017/rabbitMq_user"
AMQP_SERVER = "amqp://localhost:5672"
```

Open Register Service and User Service in separte terminals and in both the terminals run


```bash
npm install
```

and then run 

```bash
npm run dev
```

In this demo I have used RabbitMq as message Broke.
In User Service we will create User and publish message, that message will consume in Register Service. We will then delete user from Register Service and It will also Publish message and that message this time will consume user side. 

I have used RESTAPI for this demo.

### Create user curl 
API [http://localhost:1234/api/users](http://localhost:1234/api/users) (DELETE)
```curl
curl --location --request POST 'http://localhost:1234/api/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name":"Joe",
    "email":"jod@ex.com",
    "bio":"just joe",
    "password":"12345678"
}'
```

### Delete user curl 
API  [http://localhost:4567/api/users/:id](http://localhost:1234/api/users/:id) (POST)
```curl
curl --location --request DELETE 'http://localhost:4567/api/users/60daf6d01923fa2540f56869'
```