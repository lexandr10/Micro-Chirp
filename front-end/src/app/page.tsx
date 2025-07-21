'use client'


import { useQuery } from "@tanstack/react-query";
import { chirpService } from "@/services/chirp.service";


export default function Home() {
  const { data: chirps, isLoading, isError } = useQuery({
    queryKey: ['chirps'],
    queryFn: () => chirpService.getAll()
  })

  if (isLoading) return <div className="text-center mt-10">Loading chirps...</div>;
  if (isError) return (
    <div className="text-center mt-10 text-red-500">Failed to load chirps</div>
  );




  return (
    <main>
      <h1 className="text-2xl font-bold mb-6 text-center">All Chirps</h1>
      <ul className="space-y-4">
        {chirps?.map((chirp) => (
          <li className="border p-4 rounded shadow" key={chirp.id}>
            <div className="font-semibold">@{`User ${chirp.user_id}`}</div>
            <p className="font-semibold">{chirp.content}</p>
            <div className="text-gray-500 text-sm">
              {new Date(chirp.created_at).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
