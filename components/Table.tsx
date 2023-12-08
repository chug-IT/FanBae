import { StyleSheet, View } from 'react-native';

type TableProps<TProps> = {
  Component: (props: TProps) => JSX.Element;
  componentProps: TProps[];
  columns: number;
};

export default function Table<TProps>({ Component, componentProps, columns }: TableProps<TProps>) {
  const rows = [];
  for (let i = 0; i < componentProps.length; i += columns) {
    const row = componentProps.slice(i, i + columns);
    rows.push(row);
  }

  return (
    <View style={styles.table}>
      {rows.map((row) => (
        <View style={styles.row} key={`Row start: ${JSON.stringify(row[0])}`}>
          {row.map((props) => (
            <Component {...props} key={JSON.stringify(props)} />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  table: {
    gap: 15,
    margin: 30,
  },
  row: {
    flexDirection: 'row',
    gap: 14,
  },
});
