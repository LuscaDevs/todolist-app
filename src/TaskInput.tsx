import { useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { Task } from "./Task";

const TaskInput = ({ newTaskList, lista }: any) => {
    const [description, setDescription] = useState('');

    const handlePress = () => {
        if (description === '') {
            alert("Insira uma descrição!");
        } else {
            let newList = [...lista];
            let task = {
                id: Math.random(),
                title: description,
                done: false,
            };
            newList.push(task);
            newTaskList(newList);
            setDescription('');
        }
    };


    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Insira sua tarefa"
                style={styles.input}
                value={description}
                onChangeText={newDescription => setDescription(newDescription)}
                onSubmitEditing={handlePress}
            />
            <TouchableOpacity style={styles.botao} onPress={handlePress}>
                <Text style={styles.botaoText}>Adicionar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 10,
        alignItems: 'center',
    },
    input: {
        borderRadius: 20,
        textAlign: 'left',
        width: '100%',
        padding: 10,
        flexDirection: 'column',
        marginVertical: 30,
        borderWidth: 2,
        borderColor: '#d0e0eb',
        backgroundColor: '#d0e0eb',
    },
    botao: {
        backgroundColor: '#ab89f0',
        borderRadius: 20,
        width: '50%',
        padding: 10,
        alignItems: 'center',
    },
    botaoText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default TaskInput;
