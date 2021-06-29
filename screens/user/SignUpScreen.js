import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {
   ScrollView,
   View,
   KeyboardAvoidingView,
   StyleSheet,
   Button,
   ActivityIndicator,
   Alert,
   Text,
} from 'react-native';

import {LinearGradient} from 'expo-linear-gradient';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';

import {formReducer} from '../utils/formReducer';
import {styles} from './styles';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const SignUpScreen = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState();
   const dispatch = useDispatch();
   const {navigate, goBack, replace} = useNavigation();

   const [formState, dispatchFormState] = useReducer(formReducer, {
      inputValues: {
         email: '',
         password: '',
      },
      inputValidities: {
         email: false,
         password: false,
      },
      formIsValid: false,
   });

   useEffect(() => {
      if (error) {
         Alert.alert('An Error Occurred!', error, [{text: 'Okay'}]);
      }
   }, [error]);

   const authHandler = async () => {
      let action = authActions.signUp(
         formState.inputValues.email,
         formState.inputValues.password,
      );

      setError(null);
      setIsLoading(true);
      try {
         await dispatch(action);
         navigate('LeftDrawer');
         setIsLoading(false);
      } catch (err) {
         setError(err.message);
         setIsLoading(false);
      }
   };

   const inputChangeHandler = useCallback(
      (inputIdentifier, inputValue, inputValidity) => {
         dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier,
         });
      },
      [dispatchFormState],
   );

   return (
      <KeyboardAvoidingView
         behavior="hated"
         keyboardVerticalOffset={50}
         style={styles.screen}>
         <LinearGradient
            colors={['#ffedff', '#ffe3ff']}
            style={styles.gradient}>
            <Card style={styles.authContainer}>
               <ScrollView>
                  <Input
                     id="email"
                     label="E-Mail"
                     keyboardType="email-address"
                     required
                     email
                     placeHolder="email address"
                     autoCapitalize="none"
                     errorText="Please enter a valid email address."
                     onInputChange={inputChangeHandler}
                     initialValue=""
                  />
                  <Input
                     id="password"
                     label="Password"
                     keyboardType="default"
                     secureTextEntry
                     required
                     minLength={5}
                     autoCapitalize="none"
                     errorText="Please enter a valid password."
                     onInputChange={inputChangeHandler}
                     initialValue=""
                  />
                  <View style={styles.buttonContainer}>
                     {isLoading ? (
                        <ActivityIndicator size="small" color="black" />
                     ) : (
                        <Button
                           title="Sign Up"
                           color="black"
                           onPress={authHandler}
                        />
                     )}
                  </View>
                  <View style={styles.buttonContainer}>
                     <Button
                        title="Switch to Login"
                        color="black"
                        onPress={() => {
                           setIsSignup((prevState) => !prevState);
                        }}
                     />
                  </View>
               </ScrollView>
            </Card>
         </LinearGradient>
      </KeyboardAvoidingView>
   );
};

export default SignUpScreen;
