import {StyleSheet} from 'react-native';

const getStyleObj = ({}) => {
   return StyleSheet.create({
      screen: {
         margin: 20,
      },
      summary: {
         flexDirection: 'row',
         alignItems: 'center',
         justifyContent: 'space-between',
         marginBottom: 20,
         padding: 10,
      },
      summaryText: {
         fontSize: 18,
      },
      amount: {
         color: 'white',
      },
   });
};

export default getStyleObj;
