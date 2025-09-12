import React, { useState } from "react";
import {
  Image,
  ImageResizeMode,
  ImageStyle,
  StyleProp,
  Text,
  View,
} from "react-native";
import Touch from "./Touch";
import ImageView from "react-native-image-viewing";
import { Ionicons } from "@expo/vector-icons";
import { AspectRatio } from "native-base";

interface SmartImageProps {
  src: string;
  resizeMode?: ImageResizeMode;
  className?: StyleProp<ImageStyle>;
  imageStyle?: StyleProp<ImageStyle>;
}

export default function SmartImage(props: SmartImageProps) {
  const { src, resizeMode = "cover", className, imageStyle = {} } = props;
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [images, setImages] = useState<{ uri: string }[]>([]);
  const [visible, setVisible] = useState(false);

  function handlePreviewClick() {
    setVisible(true);
    setImages([{ uri: src }]);
  }

  return (
    <View className="relative overflow-hidden">
      <AspectRatio w="full" ratio={{ base: 16 / 9 }}>
        <Touch onPress={handlePreviewClick}>
          <Image
            source={{ uri: `${src}` }}
            style={[{ width: "100%", height: "100%" }, imageStyle]}
            resizeMode={resizeMode}
            onLoadStart={() => {
              setIsError(false);
              setIsLoading(true);
            }}
            onLoadEnd={() => {
              setIsLoading(false);
            }}
            onError={() => {
              setIsLoading(false);
              setIsError(true);
            }}
          />
        </Touch>
      </AspectRatio>

      {isError && (
        <View className="absolute inset-0 items-center justify-center">
          <Ionicons name="image-outline" size={28} color="#BDBDBD" />
          <Text className="text-xs t-second mt-1">加载失败</Text>
        </View>
      )}

      <ImageView
        images={images}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      />
    </View>
  );
}
