# GraphQL API with Nest.js and TypeScript

This GraphQL API is built using Nest.js and TypeScript, providing access to various features and functionalities. The API follows the GraphQL schema-first approach, where the schema is defined using the GraphQL schema language. The server implementation utilizes Nest.js for routing and handling GraphQL requests.

## Prerequisites

- Node.js (version X.X.X)
- Yarn (optional, but recommended)

## Getting Started

1. Clone the repository:

```shell
git clone https://github.com/BaseMax/InstagramGraphQLAPI.git
```

Install the dependencies:

```shell
cd InstagramGraphQLAPI
yarn install
```

Start the development server:

```shell
yarn dev
```

Access the API at http://localhost:3000/api/graphql

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
- Follow/unfollow users
- List followers and following

**Posts:**

- Create a new post
- Retrieve a single post
- Retrieve posts by user
- Retrieve posts in the user's feed (from followed users)
- Like/unlike a post
- Comment on a post
- Delete a post (by the owner)

**Explore:**

- Retrieve popular posts
- Retrieve posts based on hashtags or tags
- Search for users by username or name

**Notifications:**

- Retrieve notifications for the user (likes, comments, follows)
- Mark notifications as read

**Direct Messaging:**

- Send a direct message to a user
- Retrieve direct message conversations
- Mark messages as read

### Queries

- RetrieveUser: Retrieve a user's profile information
- RetrievePost: Retrieve a single post by its ID
- RetrieveUserPosts: Retrieve posts created by a specific user
- RetrieveFeed: Retrieve posts from the users the current user follows
- RetrievePopularPosts: Retrieve popular posts based on likes or comments
- SearchUsers: Search for users based on username or name
- RetrieveNotifications: Retrieve notifications for the current user
- RetrieveDirectMessages: Retrieve direct message conversations for the current user

### Mutations

- CreateUser: Create a new user
- LoginUser: Authenticate and log in a user
- LogoutUser: Log out the current user
- UpdateUserProfile: Update the current user's profile information
- FollowUser: Follow another user
- UnfollowUser: Unfollow a previously followed user
- CreatePost: Create a new post
- LikePost: Like a post
- UnlikePost: Remove a like from a post
- CommentOnPost: Add a comment to a post
- DeletePost: Delete a post
- SendMessage: Send a direct message to another user
- MarkNotificationAsRead: Mark a notification as read
- MarkMessageAsRead: Mark a direct message as read

## Examples

**User Registration Mutation:**

```graphql
mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    username
    name
  }
}
```

**User Login Mutation:**

```graphql
mutation LoginUser($input: LoginUserInput!) {
  loginUser(input: $input) {
    token
  }
}
```

**Get User Profile Query:**

```graphql
query GetUserProfile($userId: ID!) {
  userProfile(userId: $userId) {
    id
    username
    name
    bio
    profilePicture
    followersCount
    followingCount
    postsCount
    followers {
      id
      username
    }
    following {
      id
      username
    }
  }
}
```

**Follow User Mutation:**

```graphql
mutation FollowUser($userId: ID!) {
  followUser(userId: $userId) {
    id
    username
  }
}
```

**Unfollow User Mutation:**

```graphql
mutation UnfollowUser($userId: ID!) {
  unfollowUser(userId: $userId) {
    id
    username
  }
}
```

**Get User's Followers Query:**

```graphql
query GetUserFollowers($userId: ID!) {
  userFollowers(userId: $userId) {
    id
    username
    name
    profilePicture
  }
}
```

**Get User's Following Query:**

```graphql
query GetUserFollowing($userId: ID!) {
  userFollowing(userId: $userId) {
    id
    username
    name
    profilePicture
  }
}
```

**Get User's Feed Query:**

```graphql
query GetUserFeed {
  userFeed {
    id
    caption
    imageUrl
    likesCount
    commentsCount
    createdAt
    user {
      id
      username
      name
      profilePicture
    }
  }
}
```

**Get Post Query:**

```graphql
query GetPost($postId: ID!) {
  post(postId: $postId) {
    id
    caption
    imageUrl
    likesCount
    commentsCount
    createdAt
    user {
      id
      username
      name
      profilePicture
    }
  }
}
```

**Search Users Query:**

```graphql
query SearchUsers($query: String!) {
  searchUsers(query: $query) {
    id
    username
    name
    profilePicture
  }
}
```

**Create Post Mutation:**

```graphql
mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    id
    caption
    imageUrl
    likesCount
    commentsCount
    createdAt
    user {
      id
      username
      name
      profilePicture
    }
  }
}
```

**Like Post Mutation:**

```graphql
mutation LikePost($postId: ID!) {
  likePost(postId: $postId) {
    id
    likesCount
  }
}
```

**Unlike Post Mutation:**

```graphql
mutation UnlikePost($postId: ID!) {
  unlikePost(postId: $postId) {
    id
    likesCount
  }
}
```

**Comment on Post Mutation:**

```graphql
mutation CommentOnPost($postId: ID!, $text: String!) {
  commentOnPost(postId: $postId, text: $text) {
    id
    text
    createdAt
    user {
      id
      username
      name
      profilePicture
    }
  }
}
```

**Delete Post Mutation:**

```graphql
mutation DeletePost($postId: ID!) {
  deletePost(postId: $postId) {
    id
  }
}
```

**Retrieve Notifications Query:**

```graphql
query RetrieveNotifications {
  notifications {
    id
    type
    createdAt
    user {
      id
      username
      name
      profilePicture
    }
    post {
      id
      caption
      imageUrl
    }
  }
}
```

**Send Direct Message Mutation:**

```graphql
mutation SendDirectMessage($recipientId: ID!, $text: String!) {
  sendDirectMessage(recipientId: $recipientId, text: $text) {
    id
    text
    createdAt
    sender {
      id
      username
      name
      profilePicture
    }
    recipient {
      id
      username
      name
      profilePicture
    }
  }
}
```

**Retrieve Direct Messages Query:**

```graphql
query RetrieveDirectMessages {
  directMessages {
    id
    text
    createdAt
    sender {
      id
      username
      name
      profilePicture
    }
    recipient {
      id
      username
      name
      profilePicture
    }
  }
}
```

These examples cover various features such as user registration, login, profile retrieval, follow/unfollow functionality, fetching followers and following users, getting the user's feed, retrieving a post, and searching for users. Remember to customize the variables and adjust the schema and resolvers accordingly to match your specific implementation.

### Auto Testing

Here's an example of a test script in TypeScript using the Jest testing framework to test the GraphQL queries and mutations for an Instagram clone API:

```typescript
import axios from 'axios';

const API_URL = 'http://your-api-endpoint';

describe('Instagram Clone API Tests', () => {
  let authToken: string;

  beforeAll(async () => {
    // Authenticate and obtain the auth token
    const response = await axios.post(`${API_URL}/login`, {
      username: 'john_doe',
      password: 'password',
    });
    authToken = response.data.token;
  });

  it('should retrieve user profile', async () => {
    const response = await axios.post(
      `${API_URL}/graphql`,
      {
        query: `
          query {
            userProfile(userId: "user_id") {
              id
              username
              name
              bio
              profilePicture
              followersCount
              followingCount
            }
          }
        `,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    expect(response.status).toBe(200);
    expect(response.data.data.userProfile).toBeDefined();
    expect(response.data.data.userProfile.username).toBe('john_doe');
  });

  it('should follow a user', async () => {
    const response = await axios.post(
      `${API_URL}/graphql`,
      {
        query: `
          mutation {
            followUser(userId: "user_id") {
              id
              username
            }
          }
        `,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    expect(response.status).toBe(200);
    expect(response.data.data.followUser).toBeDefined();
    expect(response.data.data.followUser.username).toBe('user_to_follow');
  });

  it('should create a post', async () => {
    const response = await axios.post(
      `${API_URL}/graphql`,
      {
        query: `
          mutation {
            createPost(input: { caption: "My first post", imageUrl: "image_url" }) {
              id
              caption
              imageUrl
              likesCount
              commentsCount
              createdAt
              user {
                id
                username
              }
            }
          }
        `,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    expect(response.status).toBe(200);
    expect(response.data.data.createPost).toBeDefined();
    expect(response.data.data.createPost.caption).toBe('My first post');
    expect(response.data.data.createPost.user.username).toBe('john_doe');
  });

  // Add more tests for other queries and mutations
});
```

In this example, we're using Jest and Axios to send requests to the GraphQL API and assert the expected responses. The beforeAll block authenticates the user and obtains an auth token, which is then included in the headers of subsequent requests.

You can add more tests for other queries and mutations by following a similar structure. Modify the queries/mutations, assertions, and provide the necessary variables for each test case.

Remember to replace http://your-api-endpoint with the actual URL of your GraphQL API.

To run the test script, you'll need to have Jest installed (npm install --save-dev jest) and execute the command npx jest in your project directory.

Feel free to customize the test script further according to your specific requirements.

## CLI Testing

Here are a few CURL commands that you can use to test the GraphQL queries and mutations mentioned earlier:

User Registration Mutation:

```shell
curl -X POST -H "Content-Type: application/json" -d '{"query":"mutation { createUser(input: { username: \"john_doe\", name: \"John Doe\", password: \"password\" }) { id username name } }"}' http://your-api-endpoint
```

User Login Mutation:

```shell
curl -X POST -H "Content-Type: application/json" -d '{"query":"mutation { loginUser(input: { username: \"john_doe\", password: \"password\" }) { token } }"}' http://your-api-endpoint
```

Get User Profile Query:

```shell
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <token>" -d '{"query":"query { userProfile(userId: \"user_id\") { id username name bio profilePicture followersCount followingCount postsCount followers { id username } following { id username } } }"}' http://your-api-endpoint
```

Follow User Mutation:

```shell
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <token>" -d '{"query":"mutation { followUser(userId: \"user_id\") { id username } }"}' http://your-api-endpoint
```

Unfollow User Mutation:

```shell
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <token>" -d '{"query":"mutation { unfollowUser(userId: \"user_id\") { id username } }"}' http://your-api-endpoint
```

Get User's Followers Query:

```shell
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <token>" -d '{"query":"query { userFollowers(userId: \"user_id\") { id username name profilePicture } }"}' http://your-api-endpoint
```

Get User's Following Query:

```shell
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <token>" -d '{"query":"query { userFollowing(userId: \"user_id\") { id username name profilePicture } }"}' http://your-api-endpoint
```

Get User's Feed Query:

```shell
Copy code
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <token>" -d '{"query":"query { userFeed { id caption imageUrl likesCount commentsCount createdAt user { id username name profilePicture } } }"}' http://your-api-endpoint
```

Get Post Query:

```shell
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <token>" -d '{"query":"query { post(postId: \"post_id\") { id caption imageUrl likesCount commentsCount createdAt user { id username name profilePicture } } }"}' http://your-api-endpoint
```

Search Users Query:

```shell
curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer <token>" -d '{"query":"query { searchUsers(query: \"search_query\") { id username name profilePicture } }"}' http://your-api-endpoint
```

Make sure to replace <token>, user_id, and post_id with the actual values you have obtained during authentication or from previous API responses.

Also, replace http://your-api-endpoint with the actual URL of your GraphQL API

## Contributing

Contributions are welcome! If you find any issues or would like to add new features, feel free to open a pull request.

## License

This project is licensed under the GPL-3.0 License.

Copyright 2023, Max Base
