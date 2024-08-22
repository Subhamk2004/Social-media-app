import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Bookmark = () => {
  return (
    <SafeAreaView className="h-full bg-primary flex flex-col justify-center">
      <Text className="text-center text-white font-psemibold text-2xl">This Feature is coming <Text className="text-secondary-200" >soon</Text>!!!</Text>
    </SafeAreaView>
  )
}

export default Bookmark