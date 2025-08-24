import { Box, Button, NativeBaseProvider, Text } from 'native-base';

export default function HomeScreen() {
  return (
    <NativeBaseProvider>
      <Text fontSize="lg" mb="4">Hello NativeBase</Text>
        <Box flex={1} justifyContent="center" alignItems="center" bg="coolGray.100">
          
          <Button onPress={() => alert('按钮被点击了！')}>点我</Button>
        </Box>
      </NativeBaseProvider>
  );
}
