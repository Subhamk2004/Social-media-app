import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import { Image } from 'react-native'
import FormField from '../../components/FormField'
import CustomBtn from '../../components/CustomBtn.jsx'
import { Link, router } from 'expo-router'
import { logout, signIn } from '../../lib/appwrite.js'

const SignIn = () => {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);


    const submit = async () => {
        if (!form.email || !form.password) {
          Alert.alert('Error: Please fill in all the required fields')
        }
    
        setIsSubmitting(true);
        
    
        try {
          await signIn(form.email, form.password)
    
          // set it to global state...
    
          router.replace('/home')
    
        } catch (error) {
          console.log("error in signin is: ", error);
          Alert.alert('Error', error.message);
          throw new Error(error);
        } finally {
          setIsSubmitting(false);
        }
    
      }

    return (
        <SafeAreaView className="bg-primary h-full " >
            <View className="w-full justify-center px-4 h-full -my-5">
                <Image source={images.logo}
                    resizeMode='contain'
                    className="w-[115px] h-[35px]"
                />
                <Text className="text-white mb-4 mt-2 font-pbold text-lg" >Login to Aora</Text>
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
                title="Sign In"
                handlePress={submit}
                isLoading={isSubmitting}
                />
                <View className="justify-center pt-5 flex-row gap-2">
                    <Text className="text-lg text-white font-pregular">
                        Don't have an account? 
                    </Text>
                    <Link className='text-secondary-200 text-lg font-pregular' href="/signUp" >Sign Up</Link>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SignIn