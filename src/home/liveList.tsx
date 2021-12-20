import React, { useEffect, useState } from "react";
import { Text, FlatList, StyleSheet, TouchableOpacity, View, Alert } from "react-native";
import { Button, Divider } from "react-native-elements";
import HUD from "../common/hud";

import { fetchLives } from "../services/conf";


const mockData = {
  "list": [
      {
          "chairman": "王大锤",
          "code": "163413",
          "content": "讨论王大厨的任免事宜",
          "hasPassword": false,
          "liveId": "9038658946650407424",
          "startTime": 1638257683,
          "title": "十三届六中小会"
      },
      {
          "chairman": "王大锤",
          "code": "163413",
          "content": "讨论王大厨的任免事宜",
          "hasPassword": false,
          "liveId": "9038658946650407424",
          "startTime": 1638257683,
          "title": "十三届六中小会"
      },
      {
          "chairman": "王大锤",
          "code": "163413",
          "content": "讨论王大厨的任免事宜",
          "hasPassword": false,
          "liveId": "9038658946650407424",
          "startTime": 1638257683,
          "title": "十三届六中小会"
      },
      {
          "chairman": "王大锤",
          "code": "163413",
          "content": "讨论王大厨的任免事宜",
          "hasPassword": false,
          "liveId": "9038658946650407424",
          "startTime": 1638257683,
          "title": "十三届六中小会"
      },
      {
          "chairman": "王大锤",
          "code": "163413",
          "content": "讨论王大厨的任免事宜",
          "hasPassword": false,
          "liveId": "9038658946650407424",
          "startTime": 1638257683,
          "title": "十三届六中小会"
      },
      {
          "chairman": "王大锤",
          "code": "163413",
          "content": "讨论王大厨的任免事宜",
          "hasPassword": false,
          "liveId": "9038658946650407424",
          "startTime": 1638257683,
          "title": "十三届六中小会"
      }
  ],
  "total": 1
};

const LiveListView = () => {
  const [lives, setLives] = useState([])
  const [pageNo, setPageNo] = useState(1)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    _getLives(pageNo);
  }, [])

  function _getLives(pageNo: number) {
    fetchLives(pageNo)
      .then(res => {
        // setLives(res.data.list)
        // setTotal(res.data.total)
        setLives(mockData.list)
        setTotal(mockData.total)
      })
      .catch(e => {
        HUD.toast(e.msg);
      })
  }

 function _onPressItem({ item }) {
   alert('onPress Item');
}

  const _renderItem = ({ item }) => {
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={() => _onPressItem(item)}>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.row}>
            <Text style={styles.week}>今天</Text>
            <Text style={[styles.lightText, styles.margin_L_8]}>12月29日</Text>
          </View>
          <Button title="进行中" titleStyle={{ fontSize: 14 }}
            buttonStyle={styles.stateBtn}
            containerStyle={styles.stateBtnC} />
        </View>

        <View style={[styles.row, styles.margin_T_8]}>
          <Text style={styles.titleText}>{item.title || '无标题'}</Text>
          <View style={styles.row}>
            <Text style={styles.lightText}>主持人：</Text>
            <Text>{item.chairman || '无主持人'}</Text>
          </View>
        </View>

      </View>
      </TouchableOpacity>
    );
  }

  return (
      <View>
        <FlatList
          data={lives}
          renderItem={_renderItem}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    borderColor: 'red',
    borderWidth: 1,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 }
  },
  row: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'flex-end'
  },
  week: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  stateBtnC: {
    borderRadius: 4,
    height: 20
  },
  stateBtn: {
    backgroundColor: '#00B578',
    paddingVertical: 2
  },
  lightText: {
    color: '#999999',
    fontSize: 13
  },
  titleText: {
    color: '#666666',
    fontSize: 15,
  },
  margin_L_8: {
    marginLeft: 8
  },
  margin_T_8: {
    marginTop: 16
  },
  margin_B_8: {
    marginTop: 8
  },
  margin_R_8: {
    marginTop: 8
  },
});


export default React.memo(LiveListView);