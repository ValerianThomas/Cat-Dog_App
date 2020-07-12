/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { RNCamera } from 'react-native-camera';

import Modal from './components/Modal'

export default function App() {

  const [modalOpen, changeModalStatus] = useState(false)
  const [loading, changeLoading] = useState(false)
  const [animal, changeResult] = useState('')

  postImage = (img_uri) => {
    let data = new FormData()
    data.append('file', { uri: img_uri, name: 'image.jpg', type: 'image/jpeg' })
    console.log("passing data", data)
    fetch(process.env["MODEL_ADDRESS"], {
      method: 'POST',
      body: data,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then(res => {
        console.log(res)
        return res.json()
      })
      .then(res => {
        changeLoading(false)
        data = res.data[0]
        if (data['dog'] >= data['cat']) {
          changeResult('dog')
          return changeModalStatus(true)

        }
        else {
          changeResult('cat')
          return changeModalStatus(true)
        }
      })
      .catch(error => {
        console.log(error)

        changeLoading(false)

        return false
      })
  }
  takePicture = async () => {
    if (this.camera) {
      changeLoading(true)
      data = await this.camera.takePictureAsync({ quality: 0.7, base64: false, forceUpOrientation: true, orientation: 'portrait' })
      this.postImage(data.uri)
    }
  }

  closeModal = () => {
    changeModalStatus(false)
  }

  return (
    <View style={styles.container}>
      <View style={{ height: '12%', backgroundColor: '#01a8e8', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', }}>
        <Text style={{ color: '#fff', fontSize: 25 }}>Cat or Dog</Text>
      </View>
      <View style={{ flex: 1 }}>
        <RNCamera
          style={{ flex: 1 }}
          ref={ref => {
            this.camera = ref;
          }}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}

        />
      </View>
      {
        !loading &&
        <TouchableOpacity onPress={this.takePicture.bind(this)} style={{ position: 'absolute', zIndex: 30, bottom: 0, top: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 20 }}>
          <Image style={{ height: 100, width: 100 }} source={require('./assets/img/pet.png')} />
        </TouchableOpacity>
      }
      {
        loading &&
        <View style={{ position: 'absolute', zIndex: 30, bottom: 0, top: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 20 }}>
          <View style={{ position: "relative", alignItems: 'center', justifyContent: 'center' }}>
            <Image style={{ height: 100, width: 100 }} source={require('./assets/img/loader.png')} />
            <View style={{ position: 'absolute', top: '33%', right: 0, left: 0, bototm: 0 }}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          </View>
        </View>
      }

      {
        modalOpen &&
        <Modal onPress={this.closeModal.bind(this)} animal={animal} />
      }

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
