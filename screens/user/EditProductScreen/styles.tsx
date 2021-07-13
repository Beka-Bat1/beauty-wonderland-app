import {StyleSheet} from 'react-native';
import Colors from '../../../constants/Colors';

const getStyleObj = ({}) => {
   return StyleSheet.create({
      form: {
         margin: 20,
      },
      centered: {
         flex: 1,
         justifyContent: 'center',
         alignItems: 'center',
      },
      pickerStyle: {
         marginVertical: 30,
         borderWidth: 2,
         borderColor: Colors.gray1,
         borderRadius: 0,
         padding: 15,
         paddingRight: 20,
      },
   });
};

export default getStyleObj;
