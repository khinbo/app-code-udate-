import React from "react";
import { Image, TouchableOpacity } from "react-native";

export const SocialButton = ({ icon, onPress, loading }) => {
  return (
    <TouchableOpacity
      disabled={loading}
      onPress={onPress}
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        backgroundColor: "rgba(255,255,255,1)",
        width: "30%",
        height: 40,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image source={icon} style={{ height: 20, width: 20 }} />
    </TouchableOpacity>
  );
};
