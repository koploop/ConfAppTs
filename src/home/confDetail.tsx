import { NavigationAction } from "@react-navigation/routers";
import React, { FC, useState, useEffect } from "react";
import { SectionList, KeyboardEvent, View, Text, StatusBar, StyleSheet, ScrollView } from "react-native";
import { Divider } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { SafeAreaStyle } from "../common/AppColors";
import HUD from "../common/hud";
import { AXPost } from "../login/request";

enum ItemType {
  Normal = 1,
  Date,
  Member
}


// 1. 子组件定义接口
export interface IProps {
  confId: string;
  onCompleted?: (val: string) => void; // 定义回调可以用来给父组件传值
}

interface DetailModel {
  code: string;
  config: any;
  creator: string;
  creatorName: string;
  duration: number;
  forever: boolean;
  id: number;
  record: any;
  startTime: Date;
  status: number;
  title: string;
}

// 2. 接收参数(这里用了解构)
const ConfDetail = ({ route, navigate }) => {
  const inParam: IProps = route.params.param;

  // let detail: DetailModel = {};
  // let members: any[] = [];

  const [detail, setDetail] = useState({} as DetailModel);
  const [members, setMembers] = useState([] as any);
  const [sections, setSections] = useState([] as any) // 不声明类型则默认never[],会报错

  useEffect(() => {
    _getDetail();
    _getMembers();
    
  }, [detail, members])

  const handleComplete = (val: string) => {
    inParam.onCompleted?.(val);
  };

  function _getDetail() {
    AXPost('/vcms/token_api/conference/v2/detail/get', true, {
      'id': inParam.confId
    }).then(res => {
      setDetail(res.data);
      // detail = res.data;
      _reloadSections();
    }).catch(e => {
      console.log(e);
      HUD.toast(e.msg);
    })
  }

  function _getMembers() {
    AXPost('/vcms/token_api/conference/v2/member/list', true, {
      'confId': inParam.confId
    }).then(res => {
      setMembers(res.data.list);
      // members = res.data.list
      _reloadSections();
    }).catch(e => {
      console.log(e);
      HUD.toast(e.msg);
    })
  }

  function _reloadSections() {
    if (!detail.code || !members.length) {
      console.log('>>>>>Wait all request Completed');
      return;
    };

    setSections([
      {
        title: '1',
        data: [
          { key: '会议名称', val: detail.title, type: ItemType.Normal },
          { key: '会议码', val: detail.code, type: ItemType.Normal },
          // { key: '会议密码', val: detail.config, type: ItemType.Normal }
        ]
      },
      {
        title: '2',
        data: [
          { key: '会议时间', val: detail, type: ItemType.Date }
        ]
      },
      {
        title: '3',
        data: [
          { key: '发起人', val: detail.creator, type: ItemType.Normal },
          { key: '会议成员', val: members, type: ItemType.Member }
        ]
      },
      {
        title: '4',
        data: [
          { key: '成员入会自动静音', val: detail.config.microphoneOpenDefault == true ? '关' : '开', type: ItemType.Normal },
          { key: '成员入会自动开启视频', val: detail.config.cameraOpenDefault == true ? '关' : '开', type: ItemType.Normal },
          { key: '录制', val: '关', type: ItemType.Normal }
        ]
      }
    ]);
  }

  // info: { item(data key)  index  section(section object) }
  const _renderItem = ({ index, item, section }) => {
    console.log('>>>>>%s', item.key, section.title, index);
    if (item.type == ItemType.Normal) {
      return (
        <View style={[styles.cell]}>
          <Text style={styles.text}>{item.key}</Text>
          <Text style={styles.text}>{item.val}</Text>
        </View>
      )
    }
    if (item.type == ItemType.Date) {
      return (
        <View style={styles.dateDiv}>
          <View style={styles.dateLeftDiv}>
            <Text>10:00</Text>
            <Text>2021年10月1日</Text>
          </View>
          <View style={styles.dateMidDiv}>
            <Text>一</Text>
            <View style={{ marginHorizontal: 4 }}><Text>2小时</Text></View>
            <Text>一</Text>
          </View>
          <View style={styles.dateLeftDiv}>
            <Text>12:00</Text>
            <Text>2021年10月1日</Text>
          </View>
        </View>
      );
    }
    if (item.type == ItemType.Member) {
      return (
        <View style={styles.memberDiv}>
          <Text>会议成员</Text>
          <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
            {
              members.map((member, index) => {
                return (
                  <View style={styles.memberItem}>
                    <Text style={{ fontSize: 15 }}>{member.name}</Text>
                  </View>
                );
              })
            }
          </ScrollView>
        </View>
      );
    }
    return (
      <View>
        <Text>{item.key}</Text>
      </View>
    );
  }

  const _sectionSeparator = () => {
    return <View style={{ backgroundColor: '#FAFAFA', height: 8 }}></View>
  }

  return (
    <SafeAreaView edges={['right', 'left']} style={SafeAreaStyle}>
      <StatusBar barStyle={'dark-content'} />
      {console.log('>>>>>>>render func ', detail, members)}
      <SectionList
        sections={sections}
        renderItem={_renderItem}
        ItemSeparatorComponent={() => <Divider />}
        SectionSeparatorComponent={_sectionSeparator}
      >
      </SectionList>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  cell: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    height: 55
  },
  text: {
    fontSize: 15,
    color: '#212121'
  },
  dateDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    height: 80
  },
  dateLeftDiv: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dateMidDiv: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  memberDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    margin: 16,
    maxHeight: 100
  },
  scrollView: {
    flex: 1, 
    maxWidth: 200,
  },
  scrollContent: {
    flexDirection: 'row', 
    justifyContent: 'flex-end',
    flexWrap: 'wrap'
  },
  memberItem: {
    backgroundColor: '#FAFAFA',
    marginLeft: 8,
    marginTop: 4,
    paddingHorizontal: 8,
    borderRadius: 4
  }
});

export default ConfDetail;