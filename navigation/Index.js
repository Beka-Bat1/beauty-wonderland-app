import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {StackActions, NavigationContainer } from '@react-navigation/native';

import RootNavigator from './RootNavigator';

const Index = (props) => {
   const navRef = useRef(null);
   const isAuth = useSelector((state) => !!state.auth.token);

   useEffect(() => {
      if (!isAuth && navRef.current) {
         navRef.current.dispatch(
            StackActions.navigate({routeName: 'AuthNavigator'}),
         );
      }
   }, [isAuth]);

   return (
      <NavigationContainer>
         <RootNavigator navRef={navRef} />
      </NavigationContainer>
   );
};

export default Index;
