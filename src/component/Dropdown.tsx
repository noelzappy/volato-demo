import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  SafeAreaView,
} from "react-native";

import { ListItem } from "../types/misc";

type DropdownPickerProps = {
  data: ListItem[];
  onItemSelect: (item: ListItem) => void;
  value?: ListItem;
};

const DropdownPicker = ({ data, onItemSelect, value }: DropdownPickerProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleItemSelect = (item: ListItem) => {
    onItemSelect(item);
    setModalVisible(false);
  };

  const renderItem = ({ item }: { item: ListItem }) => (
    <TouchableOpacity
      onPress={() => handleItemSelect(item)}
      style={{ paddingVertical: 10, paddingHorizontal: 20 }}
    >
      <Text style={styles.text}>{item.name}</Text>
      <View style={styles.divider} />
    </TouchableOpacity>
  );

  return (
    <View>
      <Text style={styles.label}>Select Data Model</Text>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.input}
      >
        <View>
          <Text>{value?.name || "Select Data Model"}</Text>
        </View>

        <View style={styles.caret} />
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        transparent={true}
        animationType="slide"
      >
        <SafeAreaView style={styles.modalWrapper}>
          <View style={styles.modalContent}>
            <FlatList data={data} renderItem={renderItem} />
          </View>
        </SafeAreaView>
      </Modal>

      <View
        style={
          (styles.divider,
          {
            marginBottom: 20,
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    maxWidth: 300,
  },
  text: { fontSize: 16, fontWeight: "bold", marginVertical: 10 },
  divider: {
    height: 1,
    backgroundColor: "gray",
  },
  caret: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    transform: [{ rotate: "180deg" }],
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "black",
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 10,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    marginTop: 20,
  },
});

export default DropdownPicker;
