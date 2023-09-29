import { TimePicker } from 'zaman';

function DatePicker() {
  return (
    <TimePicker
      onChange={(e) => console.log(e.hour, e.minute, e.timeConvention)}
    />
  );
}
