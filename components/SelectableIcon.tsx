import { useState } from 'react';
import { Image, ImageSourcePropType, StyleSheet, Pressable } from 'react-native';

export type SelectableIconProps = {
  imageSource: ImageSourcePropType;
  name: string;
  onSelectedChanged?: (selected: boolean, name: string) => void;
};

export default function SelectableIcon({
  imageSource,
  name,
  onSelectedChanged,
}: SelectableIconProps) {
  const [selected, setSelected] = useState(false);

  function onPress() {
    const newSelected = !selected;
    setSelected(newSelected);
    onSelectedChanged && onSelectedChanged(newSelected, name);
  }

  const containerStyle = {
    ...styles.iconContainer,
    ...(selected ? styles.iconContainerSelected : {}),
  };

  const iconStyle = {
    ...styles.icon,
    ...(selected ? styles.iconSelected : {}),
  };

  return (
    <Pressable style={containerStyle} onPress={onPress}>
      <Image source={imageSource} style={iconStyle} />
    </Pressable>
  );
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
  },
});
