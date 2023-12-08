import { Pressable } from 'react-native';
import TextInput from './TextInput';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

type DatePickerProps = {
  date: number;
  onDateChanged: (event?: DateTimePickerEvent, date?: Date) => void;
  placeHolder: string;
  setShowDatePicker: (show: boolean) => void;
  showDatePicker: boolean;
};

export default ({
  date,
  onDateChanged,
  setShowDatePicker,
  showDatePicker,
  placeHolder,
}: DatePickerProps) => {
  return (
    <>
      <Pressable onPress={() => setShowDatePicker(true)}>
        <TextInput
          placeholder={placeHolder}
          editable={false}
          value={
            date
              ? new Date(date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })
              : ''
          }
        />
      </Pressable>
      {showDatePicker && <DateTimePicker value={new Date()} onChange={onDateChanged} />}
    </>
  );
};
