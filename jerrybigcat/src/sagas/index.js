import { take, call, put, select, fork } from 'redux-saga/effects'
import { http } from '../utils'
import { actionTypes, actions } from '../reducers'

export function* getList(){
	try{
		return yield call(http.get, 'https://jsonplaceholder.typicode.com/posts')
	}catch(err){
		console.log(error)
	}
}

export function* getListFlow() {
	while(true) {
		let req = yield take(actionTypes.GET_LIST)
		let res = yield call(getList)
		if(res) {
			yield put(actions.responseGetList(res))
		}
	}
}

export default function* rootSaga(){
	yield fork(getListFlow)
}