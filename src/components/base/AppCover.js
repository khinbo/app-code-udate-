import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Appicon } from "./AppIcon";
import icons from "../../constants/icons";
import { COLORS, FONTS, SIZES } from "../../constants/theme";
import helpers from "../../constants/helpers";
import { useDispatch } from "react-redux";
import { onContentViewHandler } from "../../store/reducers/player";
import { useNavigation } from "@react-navigation/native";

export const AppCover = ({ height, featured, type = "media" }) => {
  const dispatch = useDispatch();
  const navigaiton = useNavigation();
  if (!featured) return null;
  return (
    <TouchableOpacity
      onPress={() =>
        featured?.video_url
          ? dispatch(onContentViewHandler({ item: featured, type }))
          : navigaiton.navigate("artDetails", {
              art: featured,
              color: COLORS.primary,
            })
      }
      activeOpacity={0.7}
      style={{
        backgroundColor: COLORS.lightGray,
        height,
        borderRadius: 10,
        overflow: "hidden",
      }}
    >
      <Image
        source={{ uri: helpers.getImage(featured?.cover) }}
        style={{ width: "100%", height }}
      />
      <View
        style={{
          backgroundColor: "rgba(0,0,0,0.2)",
          position: "absolute",
          bottom: 0,
          left: 0,
          top: 0,
          right: 0,
          zIndex: 10,
          justifyContent: "flex-end",
          padding: 10,
        }}
      >
        {featured?.video_url ? (
          <Appicon icon={icons.play_new} size={35} color={COLORS.white} />
        ) : null}
        <View
          style={{
            paddingLeft: 5,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              ...FONTS.h3,
              fontSize: 18,
              color: COLORS.white,
            }}
          >
            {featured?.title}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              ...FONTS.body3,
              color: COLORS.white,
            }}
          >
            {featured?.artist}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
