import AsyncStorage from '@react-native-async-storage/async-storage';

const setData = async (title, state) => {
  try {
    await AsyncStorage.setItem(title, JSON.stringify(state));
  } catch (e) {
    console.log(e);
  }
};

export const initialState = {
  showInputModal: false,
  allReminders: [], //list of objs
  locationForSun: '',
};
// setData("state", initialState); //to reset all state

export const actions = {
  setInputModal: {
    type: 'SET_INPUT_MODAL',
  },
  addReminder: theReminder => {
    return {
      type: 'ADD_REMINDER',
      reminder: theReminder,
    };
  },
  deleteReminder: theReminderId => {
    return {
      type: 'DELETE_REMINDER',
      reminderId: theReminderId,
    };
  },
  deleteAllReminders: {
    type: 'DELETE_ALL',
  },
  setLocation: thePlace => {
    return {
      type: 'SET_LOCATION',
      thePlace,
    };
  },
  setState: state => {
    return {
      type: 'SET_STATE',
      theState: state,
    };
  },
};

export const reducer = (state, action) => {
  if (action.type === 'SET_INPUT_MODAL') {
    return {
      ...state,
      showInputModal: !state.showInputModal,
    };
  }
  if (action.type === 'ADD_REMINDER') {
    const newState = {
      ...state,
      allReminders: [action.reminder, ...state.allReminders],
    };
    setData('state', newState);
    return newState;
  }
  if (action.type === 'DELETE_REMINDER') {
    const newReminders = state.allReminders.filter(
      reminder => reminder.id !== action.reminderId,
    );
    const newState = {
      ...state,
      allReminders: newReminders,
    };
    setData('state', newState);
    return newState;
  }
  if (action.type === 'DELETE_ALL') {
    const newState = {
      ...state,
      allReminders: [],
    };
    setData('state', newState);
    return newState;
  }
  if (action.type === 'SET_LOCATION') {
    const newState = {
      ...state,
      locationForSun: action.thePlace,
    };
    setData('state', newState);
    return newState;
  }
  if (action.type === 'SET_STATE') {
    return {
      ...action.theState,
    };
  }
  return state;
};
