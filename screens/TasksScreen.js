import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

export default function TasksScreen() {
    const [allTasks, setAllTasks] = useState([]);

    const getTask = async () => {
        try {
            const keys = await AsyncStorage.getAllKeys();
            const taskKeys = keys.filter((key) => key.startsWith('task_'));
            const taskData = await AsyncStorage.multiGet(taskKeys);
            const tasks = taskData.map(([key, value]) => JSON.parse(value));
            setAllTasks(tasks);
        } catch (e) {
            console.log(`Error fetching tasks: ${e}`);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            getTask();
        }, [])
    );

    const removeTask = async (taskId, taskName) => {
        try {
            await AsyncStorage.removeItem(`task_${taskId}`);
            const updatedTasks = allTasks.filter((task) => task.id !== taskId);
            setAllTasks(updatedTasks);
            Alert.alert('Task Deleted', `Task ${taskName} deleted successfully`);
        } catch (e) {
            console.log(`Error removing task: ${e}`);
        }
    };

    return (
        <View style={styles.outerContainer}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>ALL TASKS</Text>
            {allTasks.length > 0 ? (
                <ScrollView 
                style={styles.scrollContainer}
                contentContainerStyle={{paddingBottom: 50}}>
                    {allTasks.map((task) => (
                        <View key={task.id} style={styles.taskContainer}>
                            <View>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{task.task}</Text>
                                <View style={{flexDirection: 'row', marginVertical: 5}}>
                                    <Entypo name="calendar" size={17} color="black" />
                                    <Text style={{marginLeft: 5}}>{task.date}</Text>
                                </View>
                                <View style={{flexDirection: 'row', marginVertical: 5}}>
                                <AntDesign name="clockcircle" size={19} color="black" />
                                    <Text style={{marginLeft: 5}}>{task.time}</Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={{ justifyContent: 'center' }}
                                onPress={() => removeTask(task.id, task.task)}>
                                <AntDesign name="delete" size={30} color="black" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            ) : (
                <View style={{ height: '80%', justifyContent: 'center', alignItems: 'center' }}>
                    <MaterialCommunityIcons name="bed-empty" size={27} color="#787878" />
                    <Text style={{ color: '#787878' }}>No Tasks</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        marginTop: 40,
        alignItems: 'center',
    },
    scrollContainer: {
        width: '95%',
        height: '80%',
        marginTop: 10,
        paddingBottom: 20,
    },
    taskContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '95%',
        backgroundColor: '#dedede',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        alignSelf: 'center',
        flexWrap: 'wrap',
    } 
});