import { FlatList, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import TaskItem from './src/TaskItem';
import TaskInput from './src/TaskInput';
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from './src/Task';

export default function App() {
  const [data, setData] = useState<ArrayLike<Task>>([]);

  const saveData = async (data: any) => {
    try {
      const jsonValue = JSON.stringify(data);
      await AsyncStorage.setItem('@taskList', jsonValue);
    } catch (e) {
      console.error('Error saving data: ', e);
    }
  };

  const loadData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@taskList');
      setData(jsonValue != null ? JSON.parse(jsonValue) : []);
    } catch (e) {
      console.error('Error loading data: ', e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const newList = (newTaskList: any) => {
    setData(newTaskList);
    saveData(newTaskList);
  };


  return (
    <TouchableWithoutFeedback>
      <SafeAreaView style={styles.container}>
        <Text style={styles.appTitle}>Todolist App</Text>
        <TaskInput newTaskList={newList} lista={data} />
        <FlatList data={data}
          renderItem={({ item }) => <TaskItem task={item} data={data} newTaskList={newList} />}
          keyExtractor={(item) => item.id} />

      </SafeAreaView>
    </TouchableWithoutFeedback>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#49708a',
    margin: 20,
    borderRadius: 20,
  },
  appTitle: {
    margin: 20,
    borderRadius: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#d0e0eb',
  },
});
