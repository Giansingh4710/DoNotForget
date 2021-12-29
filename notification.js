import PushNotification from 'react-native-push-notification';

export const showNotification = (title, msg) => {
  PushNotification.localNotification({
    title: title,
    message: msg,
    channelId: '20',
  });
};

export const scheduledNotification = (title, msg, seconds, id) => {
  PushNotification.localNotificationSchedule({
    title: title,
    message: msg,
    repeat: true,
    date: new Date(Date.now() + seconds * 1000),
    repeatType: 'time',
    repeatTime: seconds * 1000,
    id: id,
    channelId: '20',
  });
};

export const cancelAllNotification = () => {
  PushNotification.cancelAllLocalNotifications();
};
