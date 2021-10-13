import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Color";

const CustomeHeaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      iconSize={28}
      IconComponent={Ionicons}
      color="white"
    />
  );
};

export default CustomeHeaderButton;
