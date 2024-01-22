import axios from 'axios'
import { getApiUrl } from './get-api.url'

axios.defaults.baseURL = getApiUrl()
