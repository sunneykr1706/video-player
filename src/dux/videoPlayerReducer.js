

const initialState = {
  video: {
     sources: '',
  title: '',
  subtitle: '',
  description: ''},
  playlist: [],
};

const videoPlayerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_VIDEO':
      return {
        ...state,
        video: action.payload,
      };
    default:
      return state;
  }
};

export default videoPlayerReducer;


export const setVideo = (video) => {
    return {
      type: 'SET_VIDEO',
      payload: video,
    };
  };
