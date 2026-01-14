"use server";

const API_BASE_URL = process.env.API_BASE_URL;

export interface ElevatorMapping {
  registerCode: string;
  elevatorName: string;
}

export async function fetchElevatorMappings(): Promise<Record<string, string>> {
  if (!API_BASE_URL) {
    console.warn("API_BASE_URL is not defined, skipping elevator mapping fetch");
    return {};
  }

  try {
    const response = await fetch(`${API_BASE_URL}/local/v1/arm/findArmAll`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // We might want to cache this for a bit, but user said "initial load or refresh", so fetching once per session is fine. 
                         // However, Next.js 'no-store' means it fetches every time. 
                         // Since we are calling this from a useEffect on the client, the browser/client will control the frequency (once per mount).
    });

    if (!response.ok) {
        console.error(`Elevator mapping request failed with status ${response.status}`);
        return {};
    }

    const data = await response.json();
    
    // Expected structure:
    // {
    //     "code": "200",
    //     "msg": "处理成功",
    //     "data": [
    //         { "registerCode": "...", "elevatorName": "..." },
    //         ...
    //     ]
    // }

    if (data.code !== "200" || !Array.isArray(data.data)) {
        console.error("Invalid elevator mapping response format", data);
        return {};
    }

    const mapping: Record<string, string> = {};
    data.data.forEach((item: ElevatorMapping) => {
        if (item.registerCode) {
            mapping[item.registerCode] = item.elevatorName || "Unknown Elevator";
        }
    });

    return mapping;

  } catch (error) {
    console.error("Error fetching elevator mappings:", error);
    return {};
  }
}
