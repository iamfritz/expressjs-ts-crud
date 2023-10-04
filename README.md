# Typescript Nodejs Mongodb CRUD
# Modules
User with User Role
Post with Category

# Authentication
API Key
Login Authentication

# env
```bash
DATABASE_URL=mongodb://127.0.0.1:27017/blogapp
PORT=3010
JWT_SECRET=DOREMIFASO 
UPLOAD_PATH=src/public/uploads/ 
```

## Installation

```bash
npm install
npm build
npm start

npm run migrateApiRoles
```

### TODO

### API List:
##### Authentication Module
1. [x] Register User with API Key
1. [x] Login  with API Key to generate token
1. [x] Authenticated User Profile
1. [x] Refresh Data
1. [x] Logout
1. [x] Post
1. [ ] Category
1. [ ] User
1. [] Todo

##### Post API Module
1. [x] Post List [Public]
1. [x] Create Post
1. [x] Create Post - findorcreate category field by title
# FIELDS    
- title
- description
- category - category name separate by comma (findorcreate category)
- image
- meta - custom field

1. [x] Edit Post
1. [x] View Post [Public]
1. [x] Delete Post
1. [x] Post custom field (meta field)

##### Category Module
1. [x] Category List [Public]
1. [x] Create Category
1. [x] Edit Category
1. [x] View Category [Public]
1. [x] Delete Category

##### Todo Module
1. [ ] Todo List
1. [ ] Create Todo
1. [ ] Edit Todo
1. [ ] View Todo by User Auth
1. [ ] Delete Todo
1. [ ] Permission CRUD, Status Change
1. [ ] Assign Task
