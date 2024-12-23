import { 
    Alert,
    Text, 
    ScrollView, 
    StyleSheet, 
    TouchableOpacity,
    View
} from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Entypo } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function PrioritizedTasks() {
    const [prioritizedTasks, setPrioritizedTasks] = useState([])

    const getPrioritizedTasks = async () => {
        try {
            const allTasks = await AsyncStorage.getAllKeys();
            const taskValues = await AsyncStorage.multiGet(allTasks);
            const prioritized = taskValues
            .map(([key, value]) => JSON.parse(value))
            .filter(task => task.priority === true);
            setPrioritizedTasks(prioritized);
        } catch (e) {
            console.log(`Error: ${e}`)
        };
    };

    getPrioritizedTasks();

    const removeTask = async (taskId, taskName) => {
        try {
            await AsyncStorage.removeItem(`task_${taskId}`);
            const updatedPriorities = prioritizedTasks.filter((task) => task.id !== taskId);
            setPrioritizedTasks(updatedPriorities);
            Alert.alert('Task Deleted', `Task ${taskName} deleted successfully`);
        } catch (e) {
            console.log(`Error ${e}`);
        };
    };

    return (
        <View>
            {prioritizedTasks.length > 0 ?
            (<ScrollView style={styles.scrollContainer}>
                {prioritizedTasks.map((task) => (
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
            </ScrollView>) :
            (<View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <MaterialCommunityIcons name="bed-empty" size={27} color="#787878" />
                <Text style={{ color: '#787878' }}>No Tasks</Text>
            </View>)
            }
        </View>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        width: '100%',
        marginTop: 10,
        flexGrow: 1,
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
        marginBottom: 10, 
        flexWrap: 'wrap',
    } 
})