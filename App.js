import React, {useState} from 'react';
import {StyleSheet, Text, ScrollView, View, FlatList, Alert} from 'react-native';
import {MainScreen} from './src/screens/MainScreen'
import {Navbar} from './src/components/Navbar'
import {TodoScreen} from './src/screens/TodoScreen';

export default function App() {
  const [todoId, setTodoId] = useState(null)
  const [todos, setTodos] = useState([])
  const addTodo = (title) => {
    setTodos(prev => [...prev, {
      id: Date.now().toString(),
      title: title
    }])
  }

  const removeTodo = id => {
    const todo = todos.find(t => t.id === id)
    Alert.alert(
      'Remove',
      `Do you want remove ${todo.title}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setTodoId(null)
            setTodos(prev => prev.filter(todo => todo.id !== id))
          }
        }
      ],
      { cancelable: false }
    );

  }

  let content = <MainScreen
    todos={todos}
    addTodo={addTodo}
    removeTodo={removeTodo}
    openTodo={id => {setTodoId(id)}}
  />

  if (todoId) {
    const selectedTodo = todos.find(todo => todo.id === todoId)
    content = <TodoScreen
      goBack={() => {setTodoId(null)}}
      todo={selectedTodo}
      onRemove={removeTodo}
    />
  }

  return (
    <View>
      <Navbar title='Todo App'/>
      <View style={styles.container}>
        {content}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20
  },
});
