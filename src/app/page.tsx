import { AlarmList } from "@/components/AlarmList";
import { fetchAlarms } from "@/app/actions/getAlarms";

export default async function Home() {
  const { alarms } = await fetchAlarms(1, 10);

  return (
    <main className="w-full min-h-screen bg-black text-white">
      <AlarmList initialAlarms={alarms} />
    </main>
  );
}
