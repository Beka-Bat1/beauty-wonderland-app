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
import {useNavigation} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import {LinearGradient} from 'expo-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';

import Input from '../../../components/UI/Input';
import Card from '../../../components/UI/Card';
import Colors from '../../../constants/Colors';
import * as authActions from '../../../store/actions/auth';
import getStyleObj from '../SignUpScreen/styles';

const SignInScreen = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState();
   const dispatch = useDispatch();
   const {navigate, goBack, popToTop} = useNavigation();
   const isAuth = useSelector((rootState) => rootState.auth.isAuth);
   const styles= getStyleObj()
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
            navigate('LeftDrawer');
         }
      }, [isAuth]),
   );

   const authHandler = async () => {
      let action = authActions.signIn(
         formState.inputValues.email,
         formState.inputValues.password,
      );
      setError(null);
      setIsLoading(true);
      try {
         dispatch(action);
      } catch (err) {
         setError(err.message);
         setIsLoading(false);
      }
      setIsLoading(false);
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

   const navigationHandler = () => {
      navigate('SignUp');
   };

   return (
      <KeyboardAvoidingView
         behavior="hated"
         keyboardVerticalOffset={50}
         style={styles.screen}>
         <LinearGradient
            colors={[Colors.girlish, Colors.background]}
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
                           title="Sign In"
                           color="black"
                           onPress={authHandler}
                        />
                     )}
                  </View>
                  <View style={styles.buttonContainer}>
                     <Button
                        title="Switch to Signup"
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

export default SignInScreen;
