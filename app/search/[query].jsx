import { View, Text } from 'react-native'
import React from 'react'

const Search = () => {
  return (
    <View>
      <Text>Search</Text>
    </View>
  )
}

export default Search

// Parentheses () for folders:
// Example: (tabs)
// In Next.js, folders wrapped in parentheses are used to create route groups. These groups allow you to organize routes without affecting the URL path. They're useful for grouping related routes together or for creating layouts that apply to a subset of routes.
// Square brackets [] for files:
// Example: [search].jsx
// Square brackets in file names are used for dynamic routes in Next.js. They indicate that this part of the route will be variable. For instance, [search].jsx could handle routes like /search/query1, /search/query2, etc.