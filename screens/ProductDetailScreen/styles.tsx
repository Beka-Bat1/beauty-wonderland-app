import {StyleSheet} from 'react-native';

const getStyleObj = ({}) => {
   return StyleSheet.create({
      image: {
         width: '100%',
         height: 300,
      },
      actions: {
         marginVertical: 10,
         alignItems: 'center',
      },
      price: {
         fontSize: 20,
         color: '#888',
         textAlign: 'center',
         marginVertical: 20,
      },
      description: {
         fontSize: 14,
         textAlign: 'center',
         marginHorizontal: 20,
      },
   });
};

export default getStyleObj;
