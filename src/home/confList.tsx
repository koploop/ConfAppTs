import React, { FC, useEffect, useState } from "react";
import { Text, FlatList, StyleSheet, TouchableOpacity, View, Alert } from "react-native";
import { Button, Divider } from "react-native-elements";

import { pTx } from '../common/AppSize';
import { fetchConfs } from "../services/conf";


export interface Props {
  toDetail: (val: string) => void; // 点击到会议详情
}

const ConfListView:FC<Props> = ({toDetail}) => {

  const [pageNo, setPageNo] = useState(1);
  const [total, setTotal] = useState(0)
  const [confList, setConfList] = useState([])

  useEffect(() => {
    _fetchConfs();

  }, []);

  function _fetchConfs() {
    fetchConfs([1, 3], pageNo)
      .then(res => {
        const data = res.data;
        setConfList(data.list);
      })
      .catch(e => {

      })
  }

  function _onPressItem(item: {}) {
    console.log(item.id);
    toDetail(item.id); // 回调到父组件
  }

  const _renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity activeOpacity={0.9} onPress={() => _onPressItem(item)}>
        <View style={styles.container}>

          <View style={styles.row}>
            <View style={styles.row}>
              <Text style={styles.week}>今天</Text>
              <Text style={[styles.lightText, styles.margin_L_8]}>10月30日</Text>
            </View>
            <Button title="进行中"
              titleStyle={{ fontSize: 14 }}
              buttonStyle={styles.stateBtn}
              containerStyle={styles.stateBtnC} />
          </View>

          <View style={[styles.row, styles.margin_T_8]}>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={styles.titleText}>{item.startTime}</Text>
          </View>

          <Divider style={{ marginVertical: 8 }} />

          <View style={styles.row}>
            <View style={[styles.column, styles.margin_B_8]}>
              <Text style={styles.lightText}>会议码</Text>
              <Text style={[styles.margin_T_8, styles.titleText]}>{item.code}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.lightText}>发起人</Text>
              <Text style={[styles.margin_T_8, styles.titleText]}>{item.creator}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.lightText}>与会人员</Text>
              <Text style={[styles.margin_T_8, styles.titleText]}>{item.memberCount}</Text>
            </View>
          </View>

        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <FlatList
        data={confList}
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
    paddingVertical: 4,
    borderRadius: 4,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
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
  column: {
    flexDirection: 'column',
    alignItems: 'flex-start'
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
    marginTop: 8
  },
  margin_B_8: {
    marginTop: 8
  },
  margin_R_8: {
    marginTop: 8
  },
})


export default React.memo(ConfListView);