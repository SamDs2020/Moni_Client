import axios from "axios";
import jwt from "expo-jwt";
import { AsyncStorage } from "react-native";
import { JWT_SECRET } from "react-native-dotenv";

export const API_URL = "http://192.168.43.198:4000/api"; //"http://192.168.43.198:4000/api";

const TOKEN_KEY = "token-moni";

export async function $axios() {
  const token = await GetToken();
  return axios.create({
    baseURL: API_URL,
    headers: { Authorization: `Bearer ${token ? token : ""}` }
  });
}

export async function CheckFirstTimer() {
  try {
    const axiosInstance = await $axios();
    const { id } = await GetTokenInfo();

    const res = await axiosInstance.get(`/user/firstCheck?userId=${id}`);
    if (res.data.flag) return true;
    return false;
  } catch (error) {
    return false;
  }
}
export async function SaveFirstTimer() {
  try {
    console.log("checking!");
    const axiosInstance = await $axios();
    const { id } = await GetTokenInfo();

    const res = await axiosInstance.post(`/user/first?userId=${id}`);
    if (res.data.message === "success") return true;
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function StoreToken(token) {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    return true;
  } catch {
    return false;
  }
}

export async function DeleteToken() {
  await AsyncStorage.removeItem(TOKEN_KEY);
}

async function GetToken() {
  return await AsyncStorage.getItem(TOKEN_KEY);
}

export async function GetTokenInfo() {
  const data = jwt.decode(await GetToken(), JWT_SECRET);
  return data;
}

export async function VerifyLoginStatus() {
  try {
    let token = await GetToken();
    if (!token) return false;

    let TokenValid =
      jwt.decode(token, JWT_SECRET).exp > Number.parseInt(Date.now() / 1000);
    return TokenValid ? true : false;
  } catch (error) {
    return false;
  }
}
