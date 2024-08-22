import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'
import { router, usePathname } from 'expo-router'

const SearchInput = ({initialQuery}) => {
    const pathname = usePathname()
    const [query, setQuery] = useState(initialQuery || '');

    return (
        <View className="border-2 flex-row items-center border-gray-700 bg-gray-700 w-full h-12 px-4 rounded-2xl focus:border-orange-300 
        space-x-4 ">
            <TextInput
                className="text-base mt-0.5 text-white flex-1 font-pregular"
                value={query}
                placeholder="Search for a video topic"
                placeholderTextColor="#7b7b8b"
                onChangeText={(e) => setQuery(e)}
            />

            <TouchableOpacity
                onPress={() => {
                    if (!query) {
                        return Alert.alert("Missing Query", "Please input something to the search results across database")
                    }
                    if (pathname.startsWith('/search')) router.setParams({ query })
                    else router.push(`/search/${query}`)
                    // If
                    // query is not empty, the code further checks the current pathname (the URL path of the current route).

                    // If the pathname starts with /search, it means the user is already on the search page. In this case, the setParams method is used to update the query parameter within the current route.
                    // If the pathname doesn't start with /search, it means the user is on a different page. In this case, the push method is used to navigate to the /search/${query} route, where ${query} is replaced with the actual query value.
                }}
            >
                <Image
                    source={icons.search}
                    className="w-5 h-5"
                    resizeMode='contain'
                />
            </TouchableOpacity>
        </View>
    )
}

export default SearchInput