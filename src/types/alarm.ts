export interface Alarm {
  id: string;
  registrationNumber: string;
  alarmType: string;
  previewImage: string;
  videoUrl: string;
  timestamp: string;
  location?: string;
  elevatorName?: string;
}
