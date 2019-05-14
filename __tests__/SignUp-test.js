import 'react-native';
import React from 'react';
import SignUpScreen from '../Screens/SignUpScreen';

import renderer from 'react-native-renderer';

it('test state', () => {
    let Data = renderer.create(<SignUpScreen />).getInstance();

    Data.onPressSignUp('Antonbrandtsvard@gmail.com')

    expectExport(Data.state.email).toEqual('Antonbrandtsvard@gmail.com')
})