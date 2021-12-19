# SERVER - Node back express

Tu run:
create .env and complete with your configuration

DB_USERNAME=

DB_PASSWORD=

DB_DATABASE=

DB_HOST=

then:
-npm i

-sequelize db:create 

-sequelize db:migrate 

-npm run dev


Features:
eslint
DB: mysql
ORM: sequelize
Token user: JWT 
REST API witk token required
Password: bcryptjs
dotenv
Form validations: express-validator
nodemon


Functions:
the app has two controllers. One for users and one for tasks, both REST APIs.
User generates users and their respective JWT. Allows consultation and login service. encrypts passwords with bcrypts.

the TODO controller allows the creation of tasks, requiring a token, allows querying of all tasks, tasks by user and task by id. It also allows modification and deletion of tasks, requiring task id and JWT.

For such purposes validation and auth middlewares were created.
relational database is mysql and integrated with sequelize

