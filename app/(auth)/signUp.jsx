import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import { Image } from 'react-native'
import FormField from '../../components/FormField'
import CustomBtn from '../../components/CustomBtn.jsx'
import { Link, router } from 'expo-router'
import { createUser, logout } from '../../lib/appwrite.js'

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);


  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert('Error: Please fill in all the required fields')
    }

    setIsSubmitting(true);
    

    try {
      const result = await createUser(form.email, form.password, form.username)

      // set it to global state...

      router.replace('/home')
      
      // Navigates to the '/home' route: This is similar to redirecting the user to the homepage.
      // Updates the browser's URL: The address bar will show '/home'.
      // Prevents creating a new history entry: If the user presses the back button, they won't go back to the previous page.

    } catch (error) {
      console.log("error is: ", error);
      Alert.alert('Error', error.message);
      throw new Error(error);
    } finally {
      setIsSubmitting(false);
    }

  }

  return (
    <SafeAreaView className="bg-primary h-full " >
      <View className="w-full justify-center px-4 h-full ">
        <Image source={images.logo}
          resizeMode='contain'
          className="w-[115px] h-[35px]"
        />
        <Text className="text-white mb-4 mt-2 font-pbold text-lg" >Sign up to Aora</Text>
        <FormField
          title="Username"
          value={form.username}
          placeholder="example1234"
          handleChangeText={(e) => setForm({ ...form, username: e })}
          keyboardType="email-address"
        />

        <FormField
          title="Email"
          value={form.email}
          placeholder="example@example.com"
          handleChangeText={(e) => setForm({ ...form, email: e })}
          keyboardType="email-address"
        />

        <FormField
          title="Password"
          value={form.password}
          placeholder="********"
          handleChangeText={(e) => setForm({ ...form, password: e })}
        />
        <CustomBtn
          title="Sign Up"
          handlePress={submit}
          isLoading={isSubmitting}
        />
        <View className="justify-center pt-5 flex-row gap-2">
          <Text className="text-lg text-white font-pregular">
            Have an account?
          </Text>
          <Link className='text-secondary-200 text-lg font-pregular' href="/signIn" >Login</Link>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SignUp