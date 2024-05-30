
import AdminHeader from "@/components/AdminHeader";
import ProtectedLayer from "@/components/ProtectedLayer";


export default function AdminDashboard() {

    return (<ProtectedLayer>
        <AdminHeader />
        <h1>Hello, blog!</h1>
        <p>/admin/blog/</p>
    </ProtectedLayer>)
}