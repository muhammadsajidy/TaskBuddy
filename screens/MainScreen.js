import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AddTask from '../components/AddTask';
import PrioritizedTasks from '../components/PrioritizedTasks';

export default function MainScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.addTaskContainer}>
                <AddTask />
            </View>
            <View style={styles.divider}>
                <View style={styles.line} />
                <Text style={styles.dividerText}>Prioritized Tasks:</Text>
                <View style={styles.line} />
            </View>
            <View style={styles.tasksContainer}>
                <PrioritizedTasks />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
        padding: 16,
    },
    addTaskContainer: {
        marginBottom: 40,
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 12,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#000',
    },
    dividerText: {
        marginHorizontal: 6,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    tasksContainer: {
        height: '50%',
    },
});
