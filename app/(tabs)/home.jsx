import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts, getLatestPosts } from '../../lib/appwrite.js'
import useAppwrite from '../../lib/useAppwrite.js'
import VideoCard from '../../components/VideoCard.jsx'
import { useGlobalContext } from '../../context/GlobalProvider.js'

const Home = () => {

  const { data: posts, isLoading, refetch } = useAppwrite(getAllPosts);
  const { data: latestPosts } = useAppwrite(getLatestPosts);
  const {user} = useGlobalContext();

  let [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }


  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        // data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard video = {item} />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100" >
                  Welcome back, 
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user?.username}
                </Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode='contain'
                />
              </View>
            </View>
            <SearchInput />

            <View className="w-ful flex-1 pt-5 pb-8" >
              <Text className="text-gray-300 text-lg font-pregular mb-3" >
                Latest Videos
              </Text>

              <Trending posts={latestPosts ?? []} />
              {/* above is the horizontal list inside this vertical list */}
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No videos available"
            subtitle="Be the first one to upload a video"
          />
          // this will be applied only when the Flatlist's data is empty, it does not depened if there any other embeded flatlist in it
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      // the above is for refreshing and those are it's attributes and their value is given by us, we have defined them above.
      />
    </SafeAreaView>
  )
}

export default Home