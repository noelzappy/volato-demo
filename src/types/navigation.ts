import { NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type ApplicationStackParamList = {
  Home: undefined;
};

export type ApplicationScreenProps =
  NativeStackScreenProps<ApplicationStackParamList>;
