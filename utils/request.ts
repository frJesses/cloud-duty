import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import Storage from "@/utils/cache";
import { api } from "@/config";
import { StorageKey } from "@/constants/storage";

class HYRequest {
  instance: AxiosInstance;

  whiteApi = ["/auth/refresh"];

  constructor(baseURL: string, timeout = 10000) {
    this.instance = axios.create({
      baseURL: baseURL,
      timeout,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const token = await Storage.get(StorageKey.TOKEN);
        if (!this.whiteApi.includes(config.url as string)) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response: AxiosResponse<Api.Response>) => {
        const res = response.data;
        if (res.code < 0) {
          return Promise.reject(res.msg);
        }
        return res.data;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  request<T = any>(config: AxiosRequestConfig) {
    return this.instance.request<any, T>(config);
  }

  get<T = any>(config: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: "GET" });
  }

  post<T = any>(config: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: "POST" });
  }
}

export default new HYRequest(api.deepbay);
