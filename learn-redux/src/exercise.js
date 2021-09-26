import { createStore } from 'redux';
//createStore는 스토어를 만들어주는 함수
//리액트 프로젝트에서는 단 하나의 스토어를 만든다!

//리덕스에서 관리 할 상태 정의
const initialState = {
  counter: 0,
  text: '',
  list: [],
};

//액션 타입 정의
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';
const CHANGE_TEXT = 'CHANGE_TEXT';
const ADD_TO_LIST = 'ADD_TO_LIST';

//액션 함수 정의
//화살표 함수로 작성하는 것을 추천!
const increase = () => ({
  type: INCREASE,
  //액션 객체에 'type'는 필수!
});

const decrease = () => ({
  type: DECREASE,
});

const changeText = (text) => ({
  type: CHANGE_TEXT,
  text,
  //액션 안에는 type 외에 추가적인 필드 넣을 수 있음
});

const addToList = (item) => ({
  type: ADD_TO_LIST,
  item,
});

function reducer(state = initialState, action) {
  //state=initialState -> state의 초깃값을 initialState로 지정한 것!
  switch (action.type) {
    case INCREASE:
      return {
        ...state,
        counter: state.counter + 1,
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      };
    case CHANGE_TEXT:
      return {
        ...state,
        text: action.text,
      };
    case ADD_TO_LIST:
      return {
        ...state,
        list: state.list.concat(action.item),
      };
    default:
      return state;
  }
}

//리덕스 스토어 안의 상태는 액션이 디스패치됨에 따라 업데이트
const store = createStore(reducer);

console.log(store.getState());

// 스토어안에 들어있는 상태가 바뀔 때 마다 호출되는 listener 함수
const listener = () => {
  const state = store.getState();
  console.log(state);
};

const unsubscribe = store.subscribe(listener);
// 구독을 해제하고 싶을 때는 unsubscribe() 를 호출하면 됩니다.

//디스패치는 액션을 발생 시키는 것 이라고 이해하시면 됩니다.
//dispatch 라는 함수에는 액션을 파라미터로 전달합니다
store.dispatch(increase());
store.dispatch(decrease());
store.dispatch(changeText('안녕하세요'));
store.dispatch(
  addToList({
    id: 1,
    text: '와우',
  })
);
