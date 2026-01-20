"use server";

import { Alarm } from "@/types/alarm";

const API_BASE_URL = process.env.API_BASE_URL;

interface FetchAlarmsResponse {
  list: any[]; // We'll refine this once we know the exact shape
  total: number;
}

export async function fetchAlarms(pageNum: number = 1, pageSize: number = 10, registerCode?: string): Promise<{ alarms: Alarm[], total: number }> {
  if (!API_BASE_URL) {
    throw new Error("API_BASE_URL is not defined");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/local/v1/findAlarmList`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        alarmCode: "200",
        pageNum,
        pageSize,
        registerCode,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    // console.log("API Response:", JSON.stringify(data, null, 2));

    // Expected structure based on user input:
    // {
    //   "code": "200",
    //   "msg": "处理成功",
    //   "data": {
    //       "page": 1,
    //       "pageSize": 1,
    //       "count": 44473,
    //       "data": [ ... ]
    //   }
    // }

    const rawList = data.data?.data || [];
    const total = data.data?.count || 0;

    const alarms: Alarm[] = rawList.map((item: any) => ({
      id: item.alarmCode || String(Math.random()),
      registrationNumber: item.registerCode || "Unknown",
      alarmType: item.faultName || "Unknown Type",
      previewImage: item.photo || "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1000&auto=format&fit=crop", 
      videoUrl: item.video || null,
      timestamp: item.createTime || new Date().toLocaleString(),
      isSend: item.isSend ?? 0,
      // location is not in the new API response, leaving undefined or removing from interface later
      location: undefined, 
    }));

    return { alarms, total };
  } catch (error) {
    console.error("Error fetching alarms:", error);
    // Return empty list instead of crashing, or handle error in UI
    return { alarms: [], total: 0 };
  }
}
