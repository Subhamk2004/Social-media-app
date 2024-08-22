import { View, Text, FlatList, Image } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput'
import EmptyState from '../../components/EmptyState'
import { getUserPosts, logout, searchPosts } from '../../lib/appwrite.js'
import useAppwrite from '../../lib/useAppwrite.js'
import VideoCard from '../../components/VideoCard.jsx'
import { useGlobalContext } from '../../context/GlobalProvider.js';
import { TouchableOpacity } from 'react-native'
import icons from '../../constants/icons.js'
import InfoBox from '../../components/InfoBox.jsx'
import { Redirect, router } from 'expo-router'

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts } = useAppwrite(
    () => getUserPosts(user.$id)
  );
  console.log(user);
  

  const logoutFnc = async() => {
    await logout();
    setUser(null);
    setIsLoggedIn(false);
    router.replace('/signIn')
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        // data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video={item} />
        )}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4" >
            <TouchableOpacity
              className="w-full items-end mb-10"
              onPress={logoutFnc}
            >
              <Image source={icons.logout}
                resizeMode='contain'
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary-200 rounded-xl justify-center items-center">
              <Image source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode='cover'
              />
            </View>
            <InfoBox
                title={user?.username}
                containerStyles='mt-5'
                titleStyles="text-lg"
              />
            <View className="flex-row mt-5">
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                containerStyles='mr-10'
                titleStyles="text-lg"
              />

              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>

          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos available"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  )
}

export default Profile