import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { ApplicationScreenProps } from "../types/navigation";
import { ModelOne, ModelTwo } from "../data/data";
import { FormFields, ListItem } from "../types/misc";
import DropdownPicker from "../component/Dropdown";

export default function Home({ navigation }: ApplicationScreenProps) {
  const [selectedModel, setSelectedModel] = useState<ListItem>();
  const [fieldValues, setFieldValues] = useState<FormFields>({});

  const [outputs, setOutputs] = useState<{
    [key: string]: { value: string };
  }>();

  const data: ListItem[] = [
    { id: 1, name: ModelOne.name, form: ModelOne.fields },
    {
      id: 2,
      name: ModelTwo.name,
      form: ModelTwo.fields,
    },
  ];

  useEffect(() => {
    if (fieldValues) {
      const calculateMethods = Object.values(fieldValues).filter(
        (item) => item.calculate
      );

      calculateMethods.forEach(async (item) => {
        if (item.calculate) {
          const result = await item.calculate(fieldValues);
          setOutputs((prev) => ({
            ...prev,
            [item.label]: {
              value: String(result),
            },
          }));
        }
      });
    }
  }, [fieldValues]);

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    >
      <DropdownPicker
        data={data}
        value={selectedModel}
        onItemSelect={(item) => {
          setFieldValues(item.form);
          setSelectedModel(item);
        }}
      />

      {selectedModel &&
        fieldValues &&
        Object.entries(fieldValues).map(([key, item]) => {
          return (
            <View key={key}>
              <Text style={styles.label}>{item.label}</Text>

              {item.calculate ? (
                <TextInput
                  editable={false}
                  style={styles.input}
                  value={outputs?.[item.label]?.value || ""}
                  multiline
                  numberOfLines={5}
                />
              ) : (
                <TextInput
                  editable={item.readOnly ? false : true}
                  style={styles.input}
                  value={item.value}
                  onChangeText={(text) => {
                    setFieldValues((prev) => ({
                      ...prev,
                      [key]: {
                        ...prev[key],
                        value: text,
                      },
                    }));
                  }}
                  keyboardType={item.type === "number" ? "numeric" : "default"}
                />
              )}
            </View>
          );
        })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
  },
  container: {
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  label: {
    fontSize: 16,
  },
});
