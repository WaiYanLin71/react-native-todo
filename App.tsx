import { useState, Fragment, useMemo } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";

const styles = StyleSheet.create({
  form: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
})

const App = () => {

  const [input, setInput] = useState('')
  const [todo, setTodo] = useState<any>([]);
  const [status, setStatus] = useState<null | boolean>(null);
  
  const addTodo = () => {
    setTodo((prev: any) => [...prev, { id: new Date().getTime(), name: input, completed: false }])
    setInput('');
  }

  const removeTodo = (id: number) => {
    setTodo((prev: any) => prev.filter((item: any) => item.id !== id))
  }

  const checkTodo = (id: number) => {
    setTodo((prev: any) => prev.map((item: any) => {
      if (item.id === id) {
        item.completed = !item.completed
      }
      return item
    }))
  }
  
  const todoMemo = useMemo(() => {
    return todo.filter((item: any) => status === null || item.completed === status)
  }, [todo, status])

  const toggleCheck = () => {
    const isNotAllChecked = todo.some((item: any) => !item.completed);
    setTodo((prev: any) => prev.map((item: any) => ({ ...item, completed: isNotAllChecked })))
  }
  
  const clearComplete =() => {
    setTodo((prev:any) => prev.filter((item:any) => !item.completed))
  }
  
  return (
    <View style={{ padding: 10 }}>
      <View style={styles.form}>
        <TextInput
          onChangeText={setInput}
          value={input}
          style={{
            height: 40,
            flex: 3,
            borderColor: '#1A77E5',
            borderWidth: 1,
            marginRight: 10,
            borderRadius: 5,
          }}
          placeholder="Type here to tranrslate!"
        />
        <View style={{ flex: 1 }}>
          <Button title='Add' onPress={addTodo} color='#1A77E5' />
        </View>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', marginHorizontal: -5, marginVertical: 10 }}>
        <View style={{ flex: 1, marginHorizontal: 5 }}>
          <Button title='All' color={`${status === null ? '#09D325' : '#1A77E5'}`} onPress={() => { setStatus(null) }}></Button>
        </View>
        <View style={{ flex: 1, marginHorizontal: 5 }}>
          <Button title='Active' color={`${status === false ? '#09D325' : '#1A77E5'}`} onPress={() => { setStatus(false) }}></Button>
        </View>
        <View style={{ flex: 1, marginHorizontal: 5 }}>
          <Button title='Completed' color={`${status === true ? '#09D325' : '#1A77E5'}`} onPress={() => { setStatus(true) }}></Button>
        </View>
      </View>
      {todoMemo.map((item: any) => {
        return (
          <Fragment key={item.id}>
            <View style={{ marginBottom: 10, display: 'flex', padding: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: '#EEF0F1', justifyContent: 'space-between' }}>
              <View style={
                {
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <BouncyCheckbox
                  disableBuiltInState 
                  isChecked={item['completed']}
                  size={20}
                  onPress={() => { checkTodo(parseInt(item.id)) }}
                  fillColor="#1A77E5"
                  innerIconStyle={{ borderWidth: 2 }} />
                <Text style={{ color: '#000000' }}>{item.name}</Text>

              </View>
              <Button title='Delete' color='red' onPress={() => removeTodo(parseInt(item.id))} />
            </View>
          </Fragment>
        )
      }
      )}
      <View style={{ display: 'flex', marginHorizontal: -5, flexDirection: 'row' }}>
        <View style={{ flex: 1, marginHorizontal: 5 }}>
          <Button
            title={`${!todo.length || todo.find((item: any) => !item.completed) ? 'Check All' : 'Uncheck All'}`}
            onPress={toggleCheck}
          />
        </View>
        <View style={{ flex: 1, marginHorizontal: 5 }}>
          <Button title={`Clear Completed`} onPress={clearComplete}></Button>
        </View>
      </View>
    </View>
  )
}

export default App
