import React, { FC } from 'react';
import { View, Text } from 'react-native';


export interface PrfileProps {
  account: string;
  name: string;
  phone?: number;
}

const ProfilePage: FC<PrfileProps> = () => {
  return (
    <View style={{ flex: 1, backgroundColor:'red'}}>
      <Text>Profile Page !</Text>
    </View>
  );
}

export default ProfilePage;
