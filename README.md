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
a)  Clone the repository
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
- we can install virtualenv package to create it too. use this command

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
- notice that your virtual environment should be active while installing
- using backend_requirments.txt file in the repo:
```shell
pip install -r backend_requirments.txt
```


f) navigate to the backend folder(directory)
```shell
cd backend
```

g) now you can run the backend server with this command:

```shell
python manage.py runserver
```
h) If you want to see the output, open the browser and search for this address
```shell
http://localhost:8000
or
http://127.0.0.1:8000
```

# migrate
you have more than 20 unapplied migrations. so you can not use the admin panel or database. 
- this command applies all unapplied migrations.
```shell
python manage.py migrate
```

# superuser
- To access the admin panel to manage users and materials, create a superuser:

```shell
python manage.py createsuperuser
```
- Follow the prompts to enter your desired username, email, and password.

- Go to http://localhost:8000/admin/ ↗ and log in with your superuser credentials.

# Backend Views
As a back-end developer, here are some of the key views and endpoints that you'll want to be aware of:

- school/api/v1/list/: This endpoint returns a list of all schools in the system.
- school/api/v1/<int:pk>/: This endpoint use for create update and delete a school in the system.
- student/api/v1/list/: This endpoint returns a list of all students in the system.
- student/api/v1/<int:pk>/: This endpoint use for create update and delete a student in the system.
- accounts/api/v1/registration/: endpoint for user registration.



- accounts/api/v1/jwt/create/ endpoint is typically used for creating access and refresh token
- /accounts/api/v1/jwt/refresh/ endpoint is used for refreshing user access tokens
- accounts/api/v1/jwt/verify/ endpoint is used for validating user tokens.
- accounts/api/v1/login/ : this endpoint is for login :))))

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

**User: All kind of user Profile:**

- Retrieve user profile
- Update user profile (name, bio, profile picture)
- user requesting to specific Office Manager or some other user for specific roles
- Getting notifications
- making notification for specific user
- read/seen notifications
- Deleting Profile
- Updating Profile


**Super User**

- Crud on every thing
- List and Get every thing
- Manage roles



**University Student**
- Request to office manager
- Get and List region
- Generate report of School and manager performance 
- Generate report of teacher
- mashghasham benviseh :)
- school request status
- List Attendance
- List Grade of report and attendance


**Office manager**

- CRUD on schools
- School assignment
- List and get Schools and their managers
- generate reports or analytics on student performance


**Teacher**
- Generate report on student performance
- grade assignment


**Professor**
- List Student information
- Get student information(All reports, All Attendance‏s, All assignments, Personal info, School info)
- List student's report
- Grade student report
- Generate report for student performance


**School Manager**
- CRUD on teacher
- Registeration Capacity
- Grade student performance
- Fill Attendance‏
- Get and List own teachers and own students


  **Notifications:**
- List profile template for admin
- sending notification for specific route
- getting notification for specific user


**Report**
- CRUD
- Generate PDF
- List and Get 


**Assignment**
- Generate PDF

**Attendance‏**
- Generate PDF/CSV

**Request**
- CRUD


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




```typescript
interface Report {
id : Number
name : String
student : Student
professor : Professor
report_file : File
created : DateTimeField
updated : DateTimeField
}
```



```typescript
interface Request {
id : Number
sender : Student
reciever : OfficeManager
created : DateTimeField
updated : DateTimeField
status : String
}
```





```typescript
interface Attendance {
id : Number
student : Student
school : School
school_manager : String
teacher : Teacher
is_present : BooleanField
date : DateField
enterance_time : TimeField
exit_time : TimeField
created : DateTimeField
updated : DateTimeField
}
```
## API routes and documentation are available on under domain .../swagger

## Contributing

Contributions are welcome! If you find any issues or would like to add new features, feel free to open a pull request.

## License

This project is licensed under the GPL-3.0 License.

Copyright 2023, Pooya Dehghan
