import { ScrollView, StatusBar, Text, View } from "react-native";
import { Link, Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import { images } from '../constants'
import CustomBtn from '../components/CustomBtn.jsx';
import { useGlobalContext } from "../context/GlobalProvider";

export default function Index() {
  const {isLoading, isLoggedIn} = useGlobalContext();

  if(!isLoading && isLoggedIn) return <Redirect href="/home" />

  return (
    <SafeAreaView className="h-full bg-primary" >
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="flex flex-col items-center justify-center h-full p-4" >
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5" >
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Possibilities with {' '}
              <Text className='text-secondary-200' >
                Aora
              </Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
            {/* the hrefs we are  using here will link to the nearest _layout.jsx if the page we are trying to visit is not used in the _layout.jsx
            it only works when we are using the () and [] and it helps in routing  */}
          </View>
          <Text className="text-gray-400 mt-6 text-center">
            Where creativity meets innovation: embark on a journey of limitless exploration with Aora
          </Text>
          <CustomBtn
            title="Continue With Email"
            handlePress={() => { router.push('./signIn') }}
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" barStyle="light" />
      {/* the above is for the notification bar above and what it does is that it will help us see the status basr items on the mobile 
      test it with other styles
      */}
    </SafeAreaView>
  );
}

//  