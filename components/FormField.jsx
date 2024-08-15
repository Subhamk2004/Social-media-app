import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'

const FormField = ({title, value, placeholder, handleChangeText, ...props}) => {

    let [showPassWord, setShowPAssword] = useState(false)
    return (
        <View className="mt-3">
            <Text className="text-white font-pmedium" >
                {title}
            </Text>
            <View className="border-2 flex-row items-center border-gray-700 bg-gray-700 w-full h-12 px-4 rounded-2xl focus:border-orange-300 ">
                <TextInput
                className="flex-1 text-white font-psemibold"
                value={value}
                placeholder={placeholder}
                placeholderTextColor="#7b7b8b"
                onChangeText={handleChangeText}
                secureTextEntry={title === 'Password' && !showPassWord}
                />
                { title === "Password" && 
                <TouchableOpacity onPress={() =>
                    setShowPAssword(!showPassWord)
                }>
                    <Image source={!showPassWord ? icons.eye : icons.eyehide} className="w-5 h-5" 
                    resizeMode='contain'
                    />

                </TouchableOpacity>
                }
            </View>
        </View>
    )
}

export default FormField