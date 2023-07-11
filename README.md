# University Project With Django And React

This project consists of four team members overall devided into two teams of two in frontend and backend.
We will use Django to provide apis for reaching out to business logic and database and also use reactjs library for client side.
In Bellow and up comming parts of this readme file you will find pre requests to run projects in client and server side ,
All models , use cases and methods used in project.

## Prerequisites

- Node.js (version X.X.X)
- Npm (version X.X.X)
- Django (version Y.Y.Y)

# Getting Started

## Preparing the backend side
a)  clone the repository
```shell
git clone  https://github.com/pooya-dehghan/educational_ministry_irp
```

b) Navigate to the project directory:
```shell
cd educational_ministry_irp
```
c) Create a virtual environment to isolate project dependencies locally

```shell
python -m venv <name of your virtualenv>
example:
python -m venv my_env
```
- we can install virtualenv package for create it too. use this command

```shell
python -m pip install virtualenv
```
- after installing virtualenv use this command for creating your virtual environment

```shell
virtualenv <name of your environment>
example:
virtualenv my_env
```
d) activate your virtual environment
- windows
```shell
<name of your environment>\Scripts\activate
example:
my_env\Scripts\activate
```
- linux:
```shell
source <name of your environment>/bin/activate
example:
source my_env/bin/activate
```

e) Install the dependencies(Backend side)
- using backend_requirments.txt file in the repo:
```shell
pip install -r backend_requirments.txt
```







# Install the dependencies(client side):


```shell
cd educational_ministry_irp
npm install
```



```shell
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

Access the API at http://localhost:XXXX/XXXX/XXXX

## Authentication

This API uses token-based authentication. To access protected endpoints, include an Authorization header in your requests with the value `Bearer YOUR_TOKEN`.

## Features

**User Authentication:**

- User registration
- User login
- User logout
- Password reset/forgot password

**User Profile:**

- Retrieve user profile
- Update user profile (name, bio, profile picture)
- Signing user to specific organization or some other user for specific roles
- Retrieve user overall information
- Retrieve user alerts (signed into somewhere , has a task , has a new message from boss , has a new role)

**Notifications:**

- Retrieve notifications for the user (oraganizations working with , users working with , messages , alerts)
- Mark notifications as read
- Retrive notifications queue (all notification sent to user)

**Direct Messaging:**

- Send a direct message to a user
- Retrieve direct message conversations
- Mark messages as read
- Get message numbers as didnt read yet
- Message Restrictions for user (user with access student wont be able to message organizations)

## Models

```typescript
interface User {
id : number
organization : Organization
messagesSent : Message[]
messagesRecieved : Message[]
role : string
tasks : Task[]
status : string
notifications : Notification[]
alerts : Alert[]
firstname : string
lastname : string
username : string
phonenumber : string
email : string
bio : string
school : School
manager Manager
}
```

```typescript
interface Organization : {
id : number
name : string
role : string
phonenumbers : string[]
manager : Manager
students : Student[]
schools : School[]
}
```

```typescript
interface School : {
  id : number
  name : string
  phonenumbers : string[]
  dstrict : number
  city : City
  students : Student[]
  manager  : Manager
  organization : Organization
}
```

```typescript
interface Student  : {
  id  : number
  name : string
  phonenumber : string
  role : string
  city : City
  school  : School
  organization : Organization
  tasks : Task[]
  alerts : Alert[]
  notifications: Notification[]
}
```

```typescript
interface Manager {
  id: number;
  firstname: string;
  lastname: string;
  school: School;
  phonenumbers: string[];
  organization: Organization;
  tasks: Task[];
  alerts: Alert[];
  notifications: Notification[];
}
```

```typescript
interface Notification {
  id: number;
  title: string;
  body: string;
  notification_token: string;
  device_type: string;
  picture_url: string;
}
```

```typescript
interface Alert {
  id : number
  title : string
  body : string
  type : string #(success ,warning , error , info)
  read : boolean
}
```

```typescript
interface Message {
  id: number;
  message: string;
  sender: User;
  reciever: User;
  read: boolean;
}
```

```typescript
interface Task {
  id : number
  user : User
  title : string
  description : string
  dueTime : Time
  createdTime : Time
  giver : User
  status : string #(done , in_progress , draft)
}
```

```typescript
interface City : {
  id : number
  name : string
  countery : string
  districts : number[]
}
```

## API Routes

| Route                       | Method | Description                                                                          |
| --------------------------- | ------ | ------------------------------------------------------------------------------------ |
| `/api/auth/signup`          | POST   | Register a new user account                                                          |
| `/api/auth/login`           | POST   | Authenticate and log in a user                                                       |
| `/api/auth/logout`          | POST   | Log out the currently authenticated user                                             |
| `/api/users`                | GET    | Get all users (admin only)                                                           |
| `/api/users/:id`            | GET    | Get a specific user by ID                                                            |
| `/api/users/:id`            | PUT    | Update a specific user by ID                                                         |
| `/api/users/:id`            | DELETE | Delete a specific user by ID                                                         |
| `/api/task/:userId/giverId` | Post   | create a new task for user                                                           |
| `/api/task/:userId`         | GET    | get all task for a user by ID                                                        |
| `/api/task/:taskId`         | DELETE | Delete a specific task by ID                                                         |
| `/api/task/:taskId`         | GET    | Get a task informationa and state by ID                                              |
| `/api/task/:taskId`         | PUT    | Update a task by ID                                                                  |
| `/api/task/:giverId`        | GET    | Get all tasks a user give and sent out                                               |
| `/api/organization`         | Post   | create a new organization                                                            |
| `/api/organization`         | GET    | get all organization                                                                 |
| `/api/organization/:id`     | PUT    | update a organization by ID                                                          |
| `/api/organization/:id`     | GET    | Get a organization informationa and state by ID                                      |
| `/api/notification/:userId` | POST   | creating sending a notification to a specific user by id and title and body provided |

This table provides an overview of the routes available in the Project System API, along with their associated HTTP methods and descriptions. Please note that this is just a sample and you may have additional routes or modify the existing ones based on your specific project requirements.

## Examples

## Contributing

Contributions are welcome! If you find any issues or would like to add new features, feel free to open a pull request.

## License

This project is licensed under the GPL-3.0 License.

Copyright 2023, Pooya Dehghan
