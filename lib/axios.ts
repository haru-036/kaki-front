import axios from "axios";

// 環境変数からAPI URLを取得
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: apiUrl, // ベースURLを設定
});

export default api;
