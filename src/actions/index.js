import axios from 'axios';

export const setLoader = (loader) => {
  return {
    type: 'SET_LOADER',
    payload: {
      loader,
    },
  };
};

export const setResponseMsg = (responseMsg) => {
  return {
    type: 'SET_RESPONSE_MSG',
    payload: {
      responseMsg,
    },
  };
};

export const saveMarkers = (markers) => {
    return {
      type: 'SAVE_MARKERS',
      payload: {
        markers,
      },
    };
};

export const saveTasks = (tasks) => {
  return {
    type: 'SAVE_TASKS',
    payload: {
      tasks,
    },
  };
};

export const setMarkersLimit = (markersLimit) => {
  return {
    type: 'SET_MARKERS_LIMIT',
    payload: {
      markersLimit,
    },
  };
};

export const setDirections = (directions) => {
  return {
    type: 'SET_DIRECTIONS',
    payload: {
      directions,
    },
  };
};