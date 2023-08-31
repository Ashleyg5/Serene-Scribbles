import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
mutation Mutation($name: String!, $username: String!, $email: String!, $password: String!) {
  addUser(name: $name, username: $username, email: $email, password: $password) {
    token
    user {
      _id
      email
      username
    }
  }
}
`;

export const UPDATE_USER = gql`
mutation Mutation($name: String, $username: String) {
  updateUser(name: $name, username: $username) {
    _id
    name
    username
  }
}
`;

export const ADD_MOOD = gql`
  mutation addMood($sticker: String!, $feeling: String!, $scale: Int!, $why: String!, $date: String!) {
    addMood(scale: $scale, sticker: $sticker, why: $why, feeling: $feeling, date: $date) {
      _id
      scale
      sticker
      why
      feeling
      date
    }
  }
`;

export const ADD_ENTRY = gql`
  mutation addEntry($description: String!, $date: String!) {
    addEntry(description: $description, date: $date) {
      _id
      description
      date
    }
  }
`;
