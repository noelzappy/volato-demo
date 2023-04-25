import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { ApplicationScreenProps } from "../types/navigation";
import { FormModel } from "../types/misc";

export default function Forms({ route }: ApplicationScreenProps) {
  const { form } = route.params as { form: FormModel };

  const [fieldValues, setFieldValues] = useState(form.fields || {});
  const [outputs, setOutputs] = useState<{
    [key: string]: { value: string };
  }>();

  useEffect(() => {
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
  }, [fieldValues]);

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    >
      {Object.entries(fieldValues).map(([key, item]) => {
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
