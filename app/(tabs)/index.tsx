import { Button, Text } from 'native-base';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View className='w-[100] h-[100] bg-blue-500'/>
      <Text fontSize="lg" mb="4" className='bg-blue'>Hello NativeBase</Text>
      <Button onPress={() => alert('按钮被点击了！')}>点我</Button>
    </SafeAreaView>
  );
}