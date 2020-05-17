import React, {useState} from 'react'
import {View, StyleSheet, TextInput, Button, Modal, Alert} from 'react-native'
import {THEME} from "../theme";

export const EditModal = ({visible, onCancel, value, onSave}) => {
  const [title, setTitle] = useState(value)

  const saveHandler = () => {
    if (title.trim().length < 3) {
      Alert.alert('Error', `Min length 3 chart.`)
    } else {
      onSave(title)
    }
  }

  return (
    <Modal visible={visible} animationType='slide'>
      <View style={styles.wrap}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholder='Enter name'
          autoCapitaliize='none'
          autoCorrect={false}
          maxLength={64}
        />
        <View style={styles.buttons}>
          <Button
            title='Cancel'
            onPress={onCancel}
            color={THEME.DANGER_COLOR}
          ></Button>
          <Button
            title='Save'
            onPress={saveHandler}
          ></Button>
        </View>
      </View>
    </Modal>
  )
}


const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    padding: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: '80%'
  },
  buttons: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})
