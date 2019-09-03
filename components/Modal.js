import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

const ANIMAL = { dog: "It's a Dog 🐶", cat: "It's a Cat 😺" }

export default function Modal(props) {
  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <Text style={styles.title}>{ANIMAL[props.animal]}</Text>
        <Text style={styles.paragraph}> If you like this little app, please like and subscribe! Ho wait... we are not on youtube.</Text>
        <TouchableOpacity onPress={props.onPress} style={styles.buttonContainer}>
          <Text style={{ fontSize: 20, color: '#fff' }}>Try again</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    backgroundColor: '#fff',
    padding: 30,
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20
  },
  paragraph: {
    textAlign: 'center'
  },
  buttonContainer: {
    paddingHorizontal: 50,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#01a8e8',
    borderRadius: 20,
    marginTop: 30
  }
})