import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Horse, Heart, Cube, Users } from 'phosphor-react-native';
import UserDetails from '../../components/UserDetails';


const test = () => {
  let [username, setUsername] = useState('Subhamk2004')
  let [userData, setUserData] = useState({})
  let [dummyUser, setDummyUser] = useState([]);

  const getUser = async () => {
    let res = await fetch(`https://api.github.com/users/${username}`)
    let data = await res.json();
    setUserData(data);
    let resF = await fetch(`https://dummyjson.com/users?limit=3`)
    let data2 = await resF.json();
    setDummyUser(data2.users);
    console.log(data2.users);
  }

  useEffect(() => {
    getUser();
    console.log();
  }, [])


  return (
    <SafeAreaView style={styles.textF} className="bg-gray-300/80 p-8 ">
      <View className="flex flex-row w-full p-3 rounded-3xl bg-white mb-5 justify-between">
        <TextInput
          onChangeText={text => setUsername(text)}
          value={username}
          placeholder='Enter your username to fetch your github profile'
          className="text-gray-400 font-semibold"
          placeholderTextColor="green"
        />
        <TouchableOpacity
          onPress={getUser}
          className="p-2 bg-green-500 rounded-2xl"
        >
          <Text className="text-base font-semibold text-white">
            Get User
          </Text>
        </TouchableOpacity>
      </View>
      <View className="bg-white w-full h-36 rounded-3xl p-4 shadow-xl shadow-gray-600 flex flex-row">
        <View className="flex flex-col justify-between h-full w-1/2">
          <Text className="text-base font-semibold">
            {userData?.name}
          </Text>
          <View className="">
            <Text className="text-4xl font-semibold">
              {userData?.public_repos}
            </Text>
            <Text className="text-gray-500">
              Public repos
            </Text>
          </View>
        </View>
        <View className="flex flex-col justify-between h-full w-1/2 items-end">
          {
            userData ?
              <Image
                source={{ uri: `${userData.avatar_url}` }}
                className="w-14 h-14 rounded-full border border-black"
              />
              :
              <Users color="blue" weight="fill" size={32} />
          }

          <View className="flex flex-row">
            <View className="text-lg font-semibold text-green-600 mr-5 flex flex-col">
              <Text className="text-lg font-semibold text-green-600">
                {userData?.followers}
              </Text>
              <Text className="text-gray-500">
                Followers
              </Text>
            </View>
            <View className="text-lg font-semibold text-yellow-600 flex flex-col">
              <Text className="text-lg font-semibold text-yellow-600">
                {userData?.following}
              </Text>

              <Text className="text-gray-500">
                following
              </Text>
            </View>
          </View>
        </View>
      </View>
      {
        dummyUser.length > 0 ?
          <FlatList
            // horizontal
            className="mt-6 flex "
            data={dummyUser}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <UserDetails item={item} />
            )}
          />
          :
          null
      }
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