import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

const CustomBtn = ({ title, handlePress, isLoading }) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.5}
            className={`bg-secondary-200 w-full rounded-xl p-2 mt-3 ${isLoading ? 'opacity-50': ''} `}
            disabled={isLoading}
            >
            <Text className=" w-full flex items-center text-center font-psemibold text-lg " >
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default CustomBtn