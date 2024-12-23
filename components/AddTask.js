import { 
    Alert,
    Button,
    Image,
    StyleSheet, 
    Switch,
    Text, 
    TextInput, 
    TouchableHighlight,
    TouchableOpacity,
    View 
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function AddTask() {
    const [task, setTask] = useState()
    const [date, setDate] = useState(new Date());
    const [dateSelected, setDateSelected] = useState(false);
    const [timeSelected, setTimeSelected] = useState(false);
    const [priority, setPriority] = useState(false);
    const [time, setTime] = useState(new Date());
    const [show, setShow] = useState(false);
    const [mode, setMode] = useState('date');
    const toggleSwitch = () => setPriority(previousState => !previousState);

    const onChange = (event, selectedValue) => {
        if (event.type === "dismissed") { 
            setShow(false); 
            return;
        }
        if (mode === 'date') {
          setDate(selectedValue || date);
          setDateSelected(true);
        } else {
          setTime(selectedValue || time);
          setTimeSelected(true);
        }
        setShow(false); 
    };

    const showPicker = (currentMode) => {
        setMode(currentMode);
        setShow(true);
    };

    const storeTask = async () => {
        if (!task || !date || !time) {
            Alert.alert('Incomplete Details', 'Please fill in all the given fields');
            return; 
        }
        const newTask = {
            id: Date.now().toString(),
            task: task,
            date: date.toLocaleDateString(),
            time: time.toLocaleTimeString(),
            priority: priority
        }
        try {
            await AsyncStorage.setItem(`task_${newTask.id}`, JSON.stringify(newTask));
            const keys = await AsyncStorage.getAllKeys();
            const taskKeys = keys.filter(key => key.startsWith('task_'));
            const taskData = await AsyncStorage.multiGet(taskKeys);
            setTask('');
            setDate(new Date());
            setTime(new Date());
            setDateSelected(false);
            setTimeSelected(false);
            setPriority(false);
            Alert.alert('Success', 'Task added successfully!');
        } catch (e) {
            Alert.alert('Error', 'Failed to save the task. Please try again.');
        }
    }

    return (
        <View style={styles.outerContainer}>
            <Text style={{fontSize: 20, fontFamily: 'Roboto_700Bold'}}>WHAT DO YOU WANT TO DO?</Text>
            <View style={styles.innerContainer1}>
                <TextInput 
                placeholder='Enter Your Task'
                value={task}
                onChangeText={setTask}
                />
            </View>
            <View style={{flexDirection: 'row'}}>
                <View style={{width: '37%', margin: 7}}>
                    <Text style={styles.outerText}>SELECT DATE</Text>
                    <TouchableOpacity style={styles.innerContainer2} onPress={() => {showPicker('date')}}>
                    <Entypo name="calendar" size={27} color="black" />
                        {dateSelected ? <Text style={styles.text}>{date.toLocaleDateString()}</Text> : null}
                    </TouchableOpacity>
                </View>
                {show && (
                    <DateTimePicker
                    value={mode === 'date' ? date : time}
                    mode={mode}
                    display="default"
                    onChange={onChange}
                    />
                )}
                <View style={{width: '37%', margin: 7}}>
                    <Text style={styles.outerText}>SELECT TIME</Text>
                    <TouchableOpacity style={styles.innerContainer2} onPress={() => {showPicker('time')}}>
                    <AntDesign name="clockcircle" size={26} color="black" />
                        {timeSelected ? <Text style={styles.text}>{time.toLocaleTimeString()}</Text> : null}
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '85%'}}>
                <Text style={{padding: 11, fontSize: 17}}>Prioritize task</Text>
                <Switch
                trackColor={{false: '#767577', true: '#2df50a'}}
                thumbColor={'#f4f3f4'}
                onValueChange={toggleSwitch}
                value={priority}
                />
            </View>
            <TouchableHighlight style={styles.button}>
                <Button title='+ Add Task' onPress={storeTask}/>
            </TouchableHighlight>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        width: '100%',
        height: 200,
        marginTop: 40,
        alignItems: 'center',
    },
    innerContainer1: {
        width: '80%',
        margin: 7,
        paddingHorizontal: 15,
        backgroundColor: '#dedede',
        borderRadius: 5
    },
    innerContainer2: {
        borderRadius: 5,
        flexDirection: 'row',
        padding: 3,
        marginTop: 5
    },
    button: {
        width: '88%',
        paddingHorizontal: 15,
        borderRadius: 15
    },
    outerText: {
        fontFamily: 'Roboto_400Regular' || 'System'
    },
    text: {
        width: '70%',
        justifyContent: 'center', 
        alignItems: 'center',
        margin: 5
    }
});