import { Alarm } from "@/types/alarm";

export const mockAlarms: Alarm[] = [
  {
    id: "1",
    registrationNumber: "REG-2024-001",
    alarmType: "Intrusion Detection",
    previewImage: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=1000&auto=format&fit=crop",
    videoUrl: "https://videos.pexels.com/video-files/3209828/3209828-hd_1080_1920_25fps.mp4",
    timestamp: "2024-01-13 10:30:00",
    location: "Main Entrance",
  },
  {
    id: "2",
    registrationNumber: "REG-2024-002",
    alarmType: "Fire Alarm",
    previewImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000&auto=format&fit=crop",
    videoUrl: "https://videos.pexels.com/video-files/1448735/1448735-hd_1920_1080_24fps.mp4",
    timestamp: "2024-01-13 11:15:00",
    location: "Warehouse B",
  },
  {
    id: "3",
    registrationNumber: "REG-2024-003",
    alarmType: "Unauthorized Access",
    previewImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop",
    videoUrl: "https://videos.pexels.com/video-files/5377700/5377700-uhd_2160_3840_25fps.mp4",
    timestamp: "2024-01-13 12:00:00",
    location: "Server Room",
  },
  {
    id: "4",
    registrationNumber: "REG-2024-004",
    alarmType: "Motion Detected",
    previewImage: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=1000&auto=format&fit=crop",
    videoUrl: "https://videos.pexels.com/video-files/853800/853800-hd_1920_1080_25fps.mp4",
    timestamp: "2024-01-13 13:45:00",
    location: "Parking Lot",
  },
  {
    id: "5",
    registrationNumber: "REG-2024-005",
    alarmType: "Smoke Detected",
    previewImage: "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?q=80&w=1000&auto=format&fit=crop",
    videoUrl: "https://videos.pexels.com/video-files/3209828/3209828-hd_1080_1920_25fps.mp4",
    timestamp: "2024-01-13 14:20:00",
    location: "Kitchen",
  }
];
