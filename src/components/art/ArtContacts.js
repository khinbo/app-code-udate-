import React from "react";
import { View, Text } from "react-native";
import { Appicon } from "../base/AppIcon";
import icons from "../../constants/icons";
import { FONTS } from "../../constants/theme";

export const ArtContacts = ({ item }) => {
  return (
    <View style={{ padding: 5 }}>
      <Text style={{ ...FONTS.body4, fontSize: 12, margin: 5 }}>
        {item?.web_link}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {item?.instagram_link ? (
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <Appicon icon={icons.instagram} color="#C13584" />
            <Text
              style={{
                marginLeft: 5,
                ...FONTS.body4,
                fontSize: 10,
                lineHeight: 15,
                flex: 1,
              }}
            >
              {item.instagram_link}
            </Text>
          </View>
        ) : null}
        {item?.twitter_link ? (
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <Appicon icon={icons.twitter} color="#1DA1F2" />
            <Text
              style={{
                marginLeft: 5,
                ...FONTS.body4,
                fontSize: 10,
                lineHeight: 15,
                flex: 1,
              }}
            >
              {item.twitter_link}
            </Text>
          </View>
        ) : null}
        {item?.facebook_link ? (
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            <Appicon icon={icons.facebook} color="#1DA1F2" />
            <Text
              style={{
                marginLeft: 5,
                ...FONTS.body4,
                fontSize: 10,
                lineHeight: 15,
                flex: 1,
              }}
            >
              {item.facebook_link}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};
