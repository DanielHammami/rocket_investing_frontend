import React from 'react'

import RNPickerSelect from "react-native-picker-select"

import { StyleSheet, Text, View, Button } from 'react-native'

export default function StrategyListScreen(props) {
  return (
    <View style = { styles.container }>
      <RNPickerSelect
        onValueChange={(value) => console.log(value)}
        items={[
          { label: "JavaScript", value: "JavaScript" },
          { label: "TypeStript", value: "TypeStript" },
          { label: "Python", value: "Python" },
          { label: "Java", value: "Java" },
          { label: "C++", value: "C++" },
          { label: "C", value: "C" },
        ]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  picker: {
    position: 'absolute',
    top: '0',
    borderColor: 'red'
  }
})