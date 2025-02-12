import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const test = () => {
  return (
    <SafeAreaView style = {styles.textF} className="bg-primary">
      <View>
        <Text>
          Status BreakDown
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default test

const styles = StyleSheet.create({
    textF: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})