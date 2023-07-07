# University Project With Django And React

This project consists of four team members overall devided into two teams of two in frontend and backend.
We will use Django to provide apis for reaching out to business logic and database and also use reactjs library for client side.
In Bellow and up comming parts of this readme file you will find pre requests to run projects in client and server side ,
All models , use cases and methods used in project.

## Prerequisites

- Node.js (version X.X.X)
- Npm (version X.X.X)
- Django (version Y.Y.Y)

## Getting Started

1. Clone the repository:

```client side
git clone https://github.com/pooya-dehghan/educational_ministry_irp
```

```server side
git clone XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

Install the dependencies:

```client side
cd educational_ministry_irp
npm install
```

```server side
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

User {
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

Organization : {
id : number
name : string
role : string
phonenumbers : string[]
manager : Manager
students : Student[]
schools : School[]
}



## Examples

## Contributing

Contributions are welcome! If you find any issues or would like to add new features, feel free to open a pull request.

## License

This project is licensed under the GPL-3.0 License.

Copyright 2023, Pooya Dehghan
