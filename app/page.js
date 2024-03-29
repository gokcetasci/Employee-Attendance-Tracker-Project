import Header from "@/components/header";
import AdminPage from "./admin/page";

export default function Home() {
  return (
    <div className="bg-slate-100">
      <Header/>
      <AdminPage/>
    </div>
  );
}
