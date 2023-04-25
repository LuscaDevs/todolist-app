import { SetStateAction, useState } from "react";
import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, TextStyle } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";


const TaskItem = ({ task, newTaskList, data }: any) => {
    const [descriptionStyle, setDescriptionStyle] = useState<TextStyle>({
        fontSize: 16,
        flex: 1,
        width: 0,
        textDecorationLine: task.done ? 'line-through' : 'none',
        opacity: task.done ? 0.2 : 1,
    });

    const [containerStyle, setContainerStyle] = useState<TextStyle>({
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 20,
        backgroundColor: '#d0e0eb',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: '#d0e0eb',
        padding: 10,
        alignItems: 'center',
        opacity: task.done ? 0.2 : 1,
    });

    const handleDelete = (id: string) => {
        let newList = data.filter((item: { id: string; }) => item.id !== id);
        newTaskList(newList);

    };
    const handleDoneCheck = (isTaskDone: boolean) => {
        if (isTaskDone) {
            setDescriptionStyle({
                ...descriptionStyle,
                textDecorationLine: 'line-through',
                opacity: 0.2,
            })
            setContainerStyle({
                ...containerStyle,
                opacity: 0.2,
            })
        }
        else {
            setDescriptionStyle({
                ...descriptionStyle,
                textDecorationLine: 'none',
                opacity: 1,
            });
            setContainerStyle({
                ...containerStyle,
                opacity: 1,
            })
        }
    };

    return (
        <View style={containerStyle}>
            <Text style={descriptionStyle}>{task.title}</Text>
            <BouncyCheckbox
                size={30}
                fillColor="#ab89f0"
                innerIconStyle={{ borderWidth: 2 }}
                isChecked={task.done}
                onPress={handleDoneCheck}>
            </BouncyCheckbox>
            <TouchableOpacity style={styles.deleteIcon} onPress={() => handleDelete(task.id)}>
                <Text style={styles.deleteIconText}>X</Text>
            </TouchableOpacity>

        </View>
    );
}



const styles = StyleSheet.create({
    deleteIcon: {
        width: 30,
        height: 30,
        backgroundColor: '#ab89f0',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,

    },
    deleteIconText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },

});
export default TaskItem;



