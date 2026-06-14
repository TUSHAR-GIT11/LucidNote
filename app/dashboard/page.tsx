import Sidebar from "../components/Sidebar"
import Toolbar from "../components/Toolbar"

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-black">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Toolbar />

        <div className="flex-1 p-16">

          <h1 className="text-6xl font-bold text-white">
            Company notes
          </h1>

          <p className="mt-10 text-zinc-500 text-2xl">
            Start typing...
          </p>

        </div>

      </div>

    </div>
  )
}