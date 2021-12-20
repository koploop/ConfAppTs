import React from "react";
import { AXPost, AXGet } from "../login/request";

const BASE_URL = '/vcms/token_api';
const PAGE_SIZE = 10;

// 获取会议列表
export async function fetchConfs(status: number[], pageNo: number, title?: string) {
  return AXPost(`${BASE_URL}/conference/v2/page`, true, {
    'status': status,
    'pageNo': pageNo,
    'pageSize': PAGE_SIZE,
    'title': title || ''
  })
}

// 获取直播列表
export async function fetchLives(pageNo: number) {
  return AXPost(`${BASE_URL}/conference/v2/live/list`, true, {
    'pageNo': pageNo,
    'pageSize': PAGE_SIZE
  })
}

