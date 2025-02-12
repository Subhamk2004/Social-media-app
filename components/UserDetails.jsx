import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const UserDetails = ({ item }) => {
    return (
        <View className="bg-white w-[300px] h-36 rounded-3xl p-4 shadow-xl mr-4">
            <View className="flex flex-row justify-between h-full">
                <View className="flex flex-col justify-between h-full w-1/2">
                    <Text className="text-base font-semibold">
                        {item.firstName}
                    </Text>
                    <View>
                        <Text className="text-4xl font-semibold">
                            {item.height}
                        </Text>
                        <Text className="text-gray-500">
                            Height
                        </Text>
                    </View>
                </View>

                <View className="flex flex-col justify-between h-full w-1/2 items-end">
                    {item.image ? (
                        <Image
                            source={{ uri: item.image }}
                            className="w-14 h-14 rounded-full border border-black"
                        />
                    ) : (
                        <Users color="blue" size={32} />
                    )}

                    <View className="flex flex-row">
                        <View className="mr-5">
                            <Text className="text-lg font-semibold text-green-600">
                                {item.age}
                            </Text>
                            <Text className="text-gray-500">
                                Age
                            </Text>
                        </View>
                        <View>
                            <Text className="text-lg font-semibold text-yellow-600">
                                {item.weight}
                            </Text>
                            <Text className="text-gray-500">
                                Weight
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default UserDetails

const styles = StyleSheet.create({})