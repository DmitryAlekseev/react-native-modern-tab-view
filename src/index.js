import React, { Component } from 'react';
import { View } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

class ModernTabView extends Component {
    constructor(props) {
        super(props);
        this.state = { index: 0, routes: [], scene: {} };
    }
    componentDidMount() {
        this.setState({ 
            index: this.props.index,
            routes: this.prepareRoutes(),
            scene: this.prepareScene()
        });
    }
    componentWillReceiveProps(props) {
        if (this.state.index !== props.index) {
            this.setState({ index: props.index });
        };
    }
    prepareRoutes = () => {
        const { children } = this.props;
        return React.Children.map(children, (child, index) => {
            return { key: child.type.displayName, title: child.props.title, index };
        });
    }
    prepareScene = () => {
        const { Children: { toArray }, cloneElement } = React;
        const { navigator, children } = this.props;
        return toArray(children).reduce((scene, child) => {
            const { type: { displayName }} = child;
            return Object.assign({}, scene, { 
                [displayName]: () => cloneElement(child, child.props) 
            });
        }, {});
    }
    onIndexChange = (index) => {
        this.setState({ index }, () => {
            this.props.onSwitch(this.state.routes[index]);
        });
    }    
    render() {
        if (this.state.routes.length === 0) return <View />;
        return <TabView 
            navigationState={this.state}
            onIndexChange={this.onIndexChange}
            renderScene={SceneMap(this.state.scene)}
            {...this.props}
        />
    }
};

ModernTabView.defaultProps = {
    index: 0,
    onSwitch: (tab) => console.log('ModernTabView.onSwitch', tab),
};

export default ModernTabView;