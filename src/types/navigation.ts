import { NavigatorScreenParams } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FormModel } from "./misc";

export type ApplicationStackParamList = {
  Forms: {
    form: FormModel;
  };
  Home: undefined;
};

export type ApplicationScreenProps =
  NativeStackScreenProps<ApplicationStackParamList>;
