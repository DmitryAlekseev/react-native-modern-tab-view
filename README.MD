# React Native Modern Tab View
Based on [react-native-tab-view](https://github.com/react-native-community/react-native-tab-view).

## Quick Start
```js
import React, { Component } from 'react';
import { View } from 'react-native';
import ModernTabView from 'react-native-modern-tab-view';

const AuthScreen = (props) => <View {...props} />;
const RootScreen = (props) => <View {...props} />;

export default class ModernTabViewExample extends Component {
    render() {
        return <ModernTabView index={0}>
            <AuthScreen />
            <RootScreen />
        </ModernTabView>
    }
};
```