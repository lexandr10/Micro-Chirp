"use client"


import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

import { chirpService } from "@/services/chirp.service";

export default function DashboardPage() {
    const [content, setContent] = useState('')
    const queryClient = useQueryClient()

    const { data: myChirps, isLoading } = useQuery({
        queryKey: ["myChirps"],
        queryFn: () => chirpService.getMyChirps()
    })

    const createMutation = useMutation({
        mutationFn: () => chirpService.create({ content }),
        onSuccess() {
            toast.success("Chirp created!")
            setContent("")
            queryClient.invalidateQueries({queryKey: ["myChirps"]})
        }
    })

    const deleteMutation = useMutation({
        mutationFn: (id: number) => chirpService.delete(id),
        onSuccess() {
            toast.success("Chirp deleted!")
            queryClient.invalidateQueries({queryKey: ['myChirps']})
        }
    })

     return (
       <main className="max-w-2xl mx-auto mt-10 px-4">
         <h1 className="text-2xl font-bold mb-6 text-center">My Chirps</h1>

         <form
           onSubmit={(e) => {
             e.preventDefault();
             if (content.trim()) createMutation.mutate();
           }}
           className="flex gap-2 mb-6"
         >
           <input
             type="text"
             value={content}
             onChange={(e) => setContent(e.target.value)}
             placeholder="What's happening?"
             className="flex-1 border rounded px-3 py-2"
           />
           <button
             type="submit"
             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
           >
             Post
           </button>
         </form>

         {isLoading ? (
           <div className="text-center">Loading your chirps...</div>
         ) : (
           <ul className="space-y-4">
             {myChirps?.map((chirp) => (
               <li
                 key={chirp.id}
                 className="border p-4 rounded shadow relative"
               >
                 <p>{chirp.content}</p>
                 <div className="text-gray-500 text-sm">
                   {new Date(chirp.created_at).toLocaleString()}
                 </div>
                 <button
                   onClick={() => deleteMutation.mutate(chirp.id)}
                   className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                 >
                   Delete
                 </button>
               </li>
             ))}
           </ul>
         )}
       </main>
     );
}