import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FONTS } from "../../constants/theme";
import icons from "../../constants/icons";

export const AppDatePicker = ({ title, value, setDate, ...otherPorps }) => {
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (_, selectedDate) => {
    const currentDate = selectedDate || value;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View>
      <TouchableOpacity
        onPress={showDatepicker}
        style={{
          width: "100%",
          flexDirection: "row",
          backgroundColor: "white",
          height: 50,
          borderWidth: 1,
          borderColor: "gray",
          borderRadius: 5,
          marginTop: 15,
          alignItems: "center",
        }}
      >
        {title && (
          <View
            style={{
              backgroundColor: "white",
              position: "absolute",
              top: -8,
              left: 65,
              zIndex: 99,
              paddingHorizontal: 0,
              paddingVertical: 0,
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                color: "rgba(0,0,0,0.6)",
                textTransform: "uppercase",
                fontWeight: "bold",
                paddingVertical: 0,
                paddingHorizontal: 5,
                ...FONTS.body4,
                fontSize: 11,
                lineHeight: 14,
              }}
            >
              {title}
            </Text>
          </View>
        )}
        <View
          style={{
            paddingHorizontal: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={icons.calender}
            style={{
              height: 15,
              width: 15,
              tintColor: "black",
            }}
          />
        </View>
        <Text
          style={{
            ...FONTS.body3,
            fontWeight: "bold",
            color: "rgba(0,0,0,0.9)",
            letterSpacing: 3,
          }}
        >
          {moment(value).format("DD-MM-YYYY")}
        </Text>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          {...otherPorps}
          testID="dateTimePicker"
          value={value}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};
