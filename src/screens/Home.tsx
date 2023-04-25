import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import { ApplicationScreenProps } from "../types/navigation";
import { SafeAreaView } from "react-native-safe-area-context";
import { ModelOne, ModelTwo } from "../data/data";
import { ListItem } from "../types/misc";

export default function Home({ navigation }: ApplicationScreenProps) {
  const data: ListItem[] = [
    { id: 1, name: "Data Model One", form: ModelOne },
    {
      id: 2,
      name: "Data Model Two",
      form: ModelTwo,
    },
  ];

  const renderItem = ({ item }: { item: ListItem }) => {
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => navigation.navigate("Forms", { form: item.form })}
      >
        <Text style={styles.text}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    padding: 20,
  },
  listItem: {
    padding: 20,
    backgroundColor: "#eee",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  text: {
    fontSize: 20,
  },
});
