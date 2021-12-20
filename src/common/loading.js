import React from 'react';
import PropTypes from 'prop-types'
import { StyleSheet, Dimensions, Text, View, Modal, ActivityIndicator } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;



export class EasyLoading {
    constructor() {
    }
    static bind(loading, key = 'default') {
        loading && (this.map[key] = loading);
    }
    static unBind(key = 'default') {
        this.map[key] = null
        delete this.map[key];
    }
    static show(text = 'Loading...', timeout = -1, key = 'default') {
      this.onShow = true;
        this.map[key] && this.map[key].setState({ "isShow": true, "text": text, "timeout": timeout });
    }
    static dismiss(text = 'Loading...', key = 'default') {
      this.onShow = false;
        this.map[key] && this.map[key].setState({ text: text, isShow: false });
    }
    static onShow = false;
}

EasyLoading.map = {};



export class Loading extends React.Component {

    static propTypes = {
        type: PropTypes.string,
        color: PropTypes.string,
        textStyle: PropTypes.any,
        loadingStyle: PropTypes.any,
    };

    constructor(props) {
        super(props);
        let handle = 0;
        this.state = {
            isShow: false,
            timeout: -1,
            text: "Loading..."
        }
        EasyLoading.bind(this, this.props.type || 'default');
    }
    componentWillUnmount() {
        clearTimeout(this.handle);
        EasyLoading.unBind(this.props.type || 'default');
    }
    render() {
        clearTimeout(this.handle);
        (this.state.timeout != -1) && (this.handle = setTimeout(() => {
            EasyLoading.dismiss(this.props.type || 'default');
        }, this.state.timeout));
        return (
            <Modal
                animationType={"fade"}
                transparent={true}
                visible={this.state.isShow}
                onRequestClose={() => { alert("Modal has been closed.") } }>
                <View style={[styles.load_box, this.props.loadingStyle]}>
                    <ActivityIndicator animating={true} color={this.props.color || '#FFF'} size={'small'} style={styles.load_progress} />
                    {/* <Text></Text> */}
                </View>
            </Modal>
        );
    }
}


const styles = StyleSheet.create({
    load_box: {
        // flex:1,
        width: 50,
        height: 50,
        backgroundColor: '#0008',
        marginLeft: SCREEN_WIDTH / 2 - 25,
        marginTop: SCREEN_HEIGHT / 2 - 25,
        borderRadius: 4
    },
    load_progress: {
        position: 'absolute',
        width: 50,
        height: 50
    },
    load_text: {
        marginTop: 30,
        color: '#FFF',
    }
});
