import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'
import CustomBtn from '../components/CustomBtn.jsx'
import { router } from 'expo-router'

const EmptyState = ({ title, subtitle }) => {
    return (
        <View className="justify-center items-center px-4 ">
            <Image source={images.empty}
                className="w-[270px] h-[215px]"
                resizeMode='contain'
            />
            <Text className="text-lg text-center font-psemibold text-white mt-2">
                {title}
            </Text>
            <Text className="font-pmedium text-sm text-gray-100" >
                {subtitle}
            </Text>
            <CustomBtn
                title="Create Video"
                handlePress={() =>router.push('/create')}
            />
        </View>
    )
}

export default EmptyState