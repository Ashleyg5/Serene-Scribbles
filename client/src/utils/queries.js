import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      name
      username
      email
      myMood {
        _id
        sticker
        feeling
        scale
        why
        date
      }
      myEntry {
        _id
        description
        date
      }
    }
  }
`;

export const QUERY_ME = gql`
query me {
 me {
    _id
    name
    username
    email
    myMood {
        _id
        sticker
        feeling
        scale
        why
        date
      }
      myEntry {
        _id
        description
        date
      }
    }
}
`;

export const QUERY_MOODS = gql`
  query getMoods {
    mood {
        _id
        sticker
        feeling
        scale
        why
        date
    }
  }
`;

export const QUERY_SINGLE_MOOD = gql`
  query getSingleMood($moodId: ID!) {
    mood(moodId: $moodId) {
        _id
        sticker
        feeling
        scale
        why
        date
    }
  }
`;

export const QUERY_ENTRIES = gql`
  query getEntries {
    entry {
        _id
        description
        date
    }
  }
`;

export const QUERY_SINGLE_ENTRY = gql`
  query getSingleEntry($entryId: ID!) {
    entry(entryId: $entryId) {
        _id
        description
        date
  }
`;