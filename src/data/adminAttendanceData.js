export const todaysRecords = [
  { id: 1, name: 'Ravi Kumar', initials: 'RK', dept: 'Engineering', checkIn: '09:02', checkOut: '18:15', location: 'Office', type: 'Office', status: 'Present', color: 'purple' },
  { id: 2, name: 'Emp Test', initials: 'ET', dept: 'Engineering', checkIn: '09:45', checkOut: '18:30', location: 'Office', type: 'Office', status: 'Late', color: 'red' },
  { id: 3, name: 'Srinivas Kandagatla', initials: 'SK', dept: 'Engineering', checkIn: '08:55', checkOut: '18:05', location: 'WFH', type: 'WFH', status: 'WFH', color: 'orange' },
  { id: 4, name: 'Priya Sharma', initials: 'PS', dept: 'Product', checkIn: '09:00', checkOut: '18:00', location: 'Office', type: 'Office', status: 'Present', color: 'indigo' },
  { id: 5, name: 'Ananya Reddy', initials: 'AR', dept: 'Design', checkIn: '—', checkOut: '—', location: '—', type: '—', status: 'Absent', color: 'blue' },
  { id: 6, name: 'Kiran Patel', initials: 'KP', dept: 'HR', checkIn: '09:10', checkOut: '18:20', location: 'Office', type: 'Office', status: 'Present', color: 'pink' },
  { id: 7, name: 'Meera Nair', initials: 'MN', dept: 'Engineering', checkIn: '09:00', checkOut: '19:30', location: 'WFH', type: 'WFH', status: 'WFH', color: 'purple' },
  { id: 8, name: 'Suresh Babu', initials: 'SB', dept: 'Engineering', checkIn: '09:03', checkOut: '18:05', location: 'Office', type: 'Office', status: 'Present', color: 'orange' },
];

export const overtimeRecords = [
  { id: 1, name: 'Meera Nair', initials: 'MN', dept: 'Engineering', date: 'Apr 22', regularHrs: '9h', overtimeHrs: '1h 30m', totalHrs: '10h 30m', reason: 'Sprint deadline', color: 'purple' },
  { id: 2, name: 'Ravi Kumar', initials: 'RK', dept: 'Engineering', date: 'Apr 21', regularHrs: '9h', overtimeHrs: '2h', totalHrs: '11h', reason: 'Release preparation', color: 'purple' },
  { id: 3, name: 'Srinivas K.', initials: 'SK', dept: 'Engineering', date: 'Apr 20', regularHrs: '9h', overtimeHrs: '1h', totalHrs: '10h', reason: 'Bug fixes', color: 'orange' },
  { id: 4, name: 'Emp Test', initials: 'ET', dept: 'Engineering', date: 'Apr 19', regularHrs: '8h', overtimeHrs: '3h', totalHrs: '11h', reason: 'Feature development', color: 'red' },
  { id: 5, name: 'Priya Sharma', initials: 'PS', dept: 'Product', date: 'Apr 18', regularHrs: '9h', overtimeHrs: '1h 45m', totalHrs: '10h 45m', reason: 'Product review', color: 'indigo' },
  { id: 6, name: 'Priya Sharma', initials: 'PS', dept: 'Product', date: 'Apr 18', regularHrs: '9h', overtimeHrs: '1h 45m', totalHrs: '10h 45m', reason: 'Product review', color: 'indigo' },
];

export const regularizationRequests = [
  { id: 1, name: 'Ananya Reddy', initials: 'AR', dept: 'Design', date: 'Apr 21', missed: 'Both', reason: 'Phone died during travel', requestedOn: 'Apr 21', status: 'Pending', color: 'blue' },
  { id: 2, name: 'Emp Test', initials: 'ET', dept: 'Engineering', date: 'Apr 20', missed: 'Check-out', reason: 'Emergency — left suddenly', requestedOn: 'Apr 21', status: 'Pending', color: 'red' },
  { id: 3, name: 'Suresh Babu', initials: 'SB', dept: 'Engineering', date: 'Apr 19', missed: 'Check-in', reason: 'Forgot to tap in', requestedOn: 'Apr 20', status: 'Approved', color: 'orange' },
  { id: 4, name: 'Kiran Patel', initials: 'KP', dept: 'HR', date: 'Apr 18', missed: 'Check-in', reason: 'System error at gate', requestedOn: 'Apr 19', status: 'Approved', color: 'pink' },
  { id: 5, name: 'Meera Nair', initials: 'MN', dept: 'Engineering', date: 'Apr 17', missed: 'Check-out', reason: 'Working remotely, forgot', requestedOn: 'Apr 18', status: 'Rejected', color: 'purple' },
];

export const historyRecords = [
  { id: 1, name: 'Ravi Kumar', initials: 'RK', dept: 'Engineering', checkIn: '09:02', checkOut: '18:15', location: 'Office', workingHrs: '9h 13m', status: 'Present', color: 'purple' },
  { id: 2, name: 'Emp Test', initials: 'ET', dept: 'Engineering', checkIn: '09:45', checkOut: '18:30', location: 'Office', workingHrs: '8h 45m', status: 'Late', color: 'red' },
  { id: 3, name: 'Srinivas Kandagatla', initials: 'SK', dept: 'Engineering', checkIn: '08:55', checkOut: '18:05', location: 'WFH', workingHrs: '9h 10m', status: 'WFH', color: 'orange' },
  { id: 4, name: 'Priya Sharma', initials: 'PS', dept: 'Product', checkIn: '09:00', checkOut: '18:00', location: 'Office', workingHrs: '9h 0m', status: 'Present', color: 'indigo' },
  { id: 5, name: 'Ananya Reddy', initials: 'AR', dept: 'Design', checkIn: '—', checkOut: '—', location: '—', workingHrs: '—', status: 'Absent', color: 'blue' },
  { id: 6, name: 'Kiran Patel', initials: 'KP', dept: 'HR', checkIn: '09:10', checkOut: '18:20', location: 'Office', workingHrs: '9h 10m', status: 'Present', color: 'pink' },
  { id: 7, name: 'Meera Nair', initials: 'MN', dept: 'Engineering', checkIn: '09:00', checkOut: '19:30', location: 'WFH', workingHrs: '10h 30m', status: 'WFH', color: 'purple' },
  { id: 8, name: 'Suresh Babu', initials: 'SB', dept: 'Engineering', checkIn: '09:03', checkOut: '18:05', location: 'Office', workingHrs: '9h 2m', status: 'Present', color: 'orange' },
];

export const absentEmployees = [
  { id: 1, name: 'Arjun Nair', dept: 'Engineering', initials: 'AN', color: 'blue' },
  { id: 2, name: 'Riya Sharma', dept: 'Design', initials: 'RS', color: 'teal' },
  { id: 3, name: 'Sneha Patel', dept: 'HR', initials: 'SP', color: 'indigo' },
  { id: 4, name: 'Kiran Rao', dept: 'QA', initials: 'KR', color: 'green' },
  { id: 5, name: 'Devraj Singh', dept: 'Marketing', initials: 'DS', color: 'indigo' },
  { id: 6, name: 'Meena Nair', dept: 'Engineering', initials: 'MN', color: 'red' },
  { id: 7, name: 'Raj Kumar', dept: 'Sales', initials: 'RK', color: 'orange' },
];

export const lateArrivals = [
  { id: 1, name: 'Preethi G', time: 'After 09:30 AM', initials: 'PG', color: 'teal' }
];

export const generateCalendarData = () => {
  const data = [];
  let day = 1;

  data.push({ empty: true }, { empty: true }, { empty: true });

  for (let i = 1; i <= 30; i++) {
    const isWeekend = (i+3) % 7 === 0 || (i+3) % 7 === 6; 
    const isHoliday = i === 2; 

    if (isWeekend) {
      data.push({ date: i, type: 'weekend' });
    } else if (isHoliday) {
      data.push({ date: i, type: 'holiday', title: 'Holiday' });
    } else {

      const absent = Math.floor(Math.random() * 8) + 1;
      const late = Math.floor(Math.random() * 5) + 1;
      const present = 142 - absent - late;
      const presentPercentage = Math.floor((present / 142) * 100);
      data.push({ date: i, type: 'workday', stats: { absent, late, presentPercentage } });
    }
  }
  return data;
};
