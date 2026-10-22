import { createClient } from '@/app/utils/supabase/client'

export default async function Home() {
  const supabase =  createClient()
  const { data, error } = await supabase
    .from('students')
    .select('*')

  if (error) return <p>Error: {error.message}</p>

  return (
    <ul>
      {data?.map((s) => (
        <li key={s.id}>{s.name}</li>
      ))}
    </ul>
  )
}