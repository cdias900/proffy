export default function convertHourToMinutes(time: string) {
  const [hour, minutes] = time.split(':').map(Number);
  const timeInMintes = (hour * 60) + minutes;
  return timeInMintes;
}
