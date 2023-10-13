import { useState } from "react";
import { Image, StyleSheet, Pressable } from "react-native";

import GreyGoose from '../assets/greygoose.png'

export default function SelectableIcon({ onSelectedChanged }) {
  const [selected, setSelected] = useState(false)

  function onPress() {
    setSelected(!selected)
    onSelectedChanged && onSelectedChanged(!selected)
  }

  const containerStyle = {
    ...styles.iconContainer,
    ...(selected ? styles.iconContainerSelected : {}),
  }

  const iconStyle = {
    ...styles.icon,
    ...(selected ? styles.iconSelected : {}),
  }

  return (
    <Pressable style={containerStyle} onPress={onPress}>
      <Image source={GreyGoose} style={iconStyle} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    borderColor: '$D7525A',
    borderRadius: 10,
    borderStyle: 'dashed',
    borderWidth: 2,
    height: 80,
    justifyContent: 'center',
    width: 80,
  },
  iconContainerSelected: {
    borderStyle: 'solid',
  },
  icon: {
    height: 80,
    width: 80,
  },
  iconSelected: {
    height: 70,
    width: 70,
  }
})