a.为管理好路由，利用react-router-config来管理路由：
    在index.js(入口文件，先引用，再调用renderRoutes )：
        import { renderRoutes } from 'react-router-config';
        ReactDOM.render( 
	( 
	  <div>
	     <BrowserRouter>
	        {renderRoutes(router【路由json数据】)}
	     </BrowserRouter>
	  </div>
         ),document.getElementById('root'));

b.定义好conifg环境，环境判断，切换域名：
const hostname = window.location.hostname;
const HOST = {
   PRO: 'https://wxapi.csair.com/',
   TEST: 'https://twx.csair.com/',
   DEV: 'http://198.162.1.80:8181/'
}
let ENV = "DEV";

if (hostname.indexof(HOST.PRO) > -1) {
   ENV = "PRO";
} else if(hostname.indexof(HOST.TEST) > -1) {
   ENV = "TEST";
} else {
   ENV = "DEV"
}

export default {
   HOST,
   ENV
}

c.引入redux文件库，未了实现复杂的子子或子夫等等进行通信。

import {createStore} from 'redux';
import {Provider} from 'react-redux';

import rootReducer from './store/reducers';（这里要定义好reducers,) :
----------------------------------
import {combineReducers} from 'redux';
import defineTypes from './actions'; (这里也要定义好行为方式) :
---------
export default {
	CHANGE_USERNAME: 'CHANGE_USERNAME',
	CHARACTERISTIC: 'CHARACTERISTIC',
	SHISGIN: 'SHISGIN'
}
----------
import initstate from './state';(定义好store的初始化的值)：
》》》》
     export default {
          count: 8,
          number: 110
     }
》》》》
const datas = initstate;
const a = (state ={count: datas['count']}, action) => {
   switch(action.type) {
    case defineTypes.CHANGE_USERNAME:
      return {
        ...state,
        count: ++state.count
      }
    default:
      return state
   }
}

const b = (state = {number: datas['number']}, action) => {
   switch(action.type) {
   	case defineTypes.SHISGIN:
   	  return {
        ...state,
         number: --state.number
      }
   	default:
   	  return state;
   }
}

const rootReducer = combineReducers({
  a,
  b
})
export default rootReducer;
----------------------------------


const store = createStore(rootReducer);

ReactDOM.render(
	<Provider store={store}>  
	   <BrowserRouter>
	       {renderRoutes(router)}
	   </BrowserRouter>
	</Provider>
	,document.getElementById('root')
);


D.重要的要是，要将这些参数都映射到项目中去：connect与 mapStateToProps关联该组件：
import {connect} from 'react-redux';
class IndexCompontent extends Component { } （组件名叫IndexCompontent ）

const mapStateToProps = (states, ownProps) => {
  const o = {};
    if (states) {
        for (let index in states) {
            for (let key in states[index]) {
              o[key] = states[index][key]
            }
        }
        return {
          store: o
        }
    }
};

connect(mapStateToProps, null)(IndexCompontent);

E.封装axio请求

import axios from 'axios'
import {HOST, ENV} from './config'

// 创建axios实例
const BaseUrl = HOST[ENV];
// const token = store.state.token
const token = window.localstorage.getItem('token') || 'as5df6asd5f6asdf5asd6f523232212k562000112';

const instance = axios.create({
  baseURL: BaseUrl, // config的BaseUrl
  timeout: 10 * 1000 // 请求超时时间
})

// request拦截器
instance.interceptors.request.use((config) => {
  if (token) {
    config.headers['token'] = token
    config.headers['Authorization'] = 'Bearer' + ' ' + token // 让每个请求携带token -- ['Authorization']为自定义key;
  }
  return config
}, error => {
  Promise.reject(error)
})

// 响应拦截
instance.interceptors.response.use((response) => {
  const res = response.data
  if (res && (res.status !== 'success')) {
    return Promise.reject(res.error)
  }
  return response
}, error => {
  Promise.reject(error)
})

// 定义请求
const request = async (url = '', type = 'get', data = {}, isQ = true) => {
  let result = null
  if (type.toLowerCase === 'get') {
    await instance.get(url, { params: data }).then((res) => {
      result = res
    })
  }
  if (type.toLowerCase() === 'post' || type.toLowerCase() === 'put') {
    if (isQ) {
      await instance.post(url, qs.stringify(data)).then(res => {
        result = res
      })
    } else {
      await instance.post(url).then(res => {
        result = res
      })
    }
  }
  return result
}

export default request

