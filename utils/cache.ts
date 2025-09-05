import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageKey } from "@/constants/storage";

class Storage {
  async set<T = any>(key: StorageKey, value: T): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.log(`设置本地缓存: ${key}失败，原因为: ${err}`);
    }
  }

  async get<T = any>(key: StorageKey): Promise<T | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (err) {
      console.log(`获取本地缓存: ${key}失败，原因为: ${err}`);
      return null;
    }
  }

  async remove(key: StorageKey): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (err) {
      console.log(`删除本地缓存: ${key}失败，原因为: ${err}`);
    }
  }

  async clean(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (err) {
      console.log(`清空本地缓存失败，原因为: ${err}`);
    }
  }
}

export default new Storage();
