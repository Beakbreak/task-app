export interface IEnviroment {
  API_URL: string;
}

export const environment: IEnviroment = {
  API_URL: import.meta.env.NG_APP_API_URL,
};
