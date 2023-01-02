import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StatusBar,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import icons from "../../constants/icons";
import images from "../../constants/images";
import { COLORS, FONTS } from "../../constants/theme";
import { Appicon } from "./AppIcon";

export const AppHeader = ({
  title,
  backButton,
  goTo,
  logo,
  color = COLORS.primary,
  shadow = false,
  otherStyles,
  onPressRight,
  rightIcon = icons.setting,
}) => {
  const navigation = useNavigation();
  return (
    <View
      style={[
        {
          backgroundColor: COLORS.white,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 50,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          height: Platform.OS === "android" ? 70 : 90,
          paddingHorizontal: 15,
          paddingBottom: 10,
        },
        shadow ? styles.shadow : null,
        otherStyles,
      ]}
    >
      <View style={{ paddingRight: 15 }}>
        {!backButton ? (
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            activeOpacity={0.7}
            style={{
              height: 20,
              width: 20,
            }}
          >
            <Appicon icon={icons.menu} color={color} size={20} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => (goTo ? goTo() : navigation.goBack())}
            activeOpacity={0.7}
            style={{
              height: 20,
              width: 20,
            }}
          >
            <Appicon icon={icons.back} color={color} size={20} />
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: 5,
        }}
      >
        {logo && <Appicon icon={images.logo} size={25} orgColor />}
        <Text
          numberOfLines={1}
          style={{
            ...FONTS.h2,
            fontSize: 17,
            color: color,
          }}
        >
          {title}
        </Text>
      </View>
      <View style={{ paddingLeft: 5, marginRight: 5 }}>
        {onPressRight && (
          <TouchableOpacity onPress={onPressRight} activeOpacity={0.7}>
            <Appicon icon={rightIcon} size={20} color={COLORS.primary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
