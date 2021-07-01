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
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';
import {styles} from './styles';

// import {formReducer} from '../utils/formReducer';
// import FORM_INPUT_UPDATE from '../utils/formReducer'

const SignUpScreen = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState();
   let isAuth = useSelector((state) => state.auth.isAuth);
   const dispatch = useDispatch();
   const {navigate, replace, goBack} = useNavigation();

   const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

   const formReducer = (state, action) => {
      if (action.type === FORM_INPUT_UPDATE) {
         const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value,
         };
         const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid,
         };
         let updatedFormIsValid = true;
         for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
         }
         return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues,
         };
      }
      return state;
   };

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

   useFocusEffect(
      useCallback(() => {
         if (isAuth) {
            console.log(isAuth, 'replacing with LeftDrawer ');
            replace('LeftDrawer');
         }
      }, [isAuth]),
   );

   const authHandler = async () => {
      console.log(formState.inputValues, 'formState.inputValues');
      let action = authActions.signUp(
         formState.inputValues.email,
         formState.inputValues.password,
      );

      setError(null);
      setIsLoading(true);
      try {
         replace('LeftDrawer');
         let response = await dispatch(action);
         console.log(response, 'login response ');
      } catch (err) {
         setError(err.message);
         setIsLoading(false);
      }

      setIsLoading(false);
   };

   const inputChangeHandler = useCallback(
      (inputIdentifier, inputValue, inputValidity) => {
         console.log(inputIdentifier, inputValue, inputValidity, '<-- heree');

         dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier,
         });
      },
      [dispatchFormState],
   );

   const navigationHandler = () => {
      navigate('SignIn');
   };

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
                        onPress={navigationHandler}
                     />
                  </View>
               </ScrollView>
            </Card>
         </LinearGradient>
      </KeyboardAvoidingView>
   );
};

export default SignUpScreen;
