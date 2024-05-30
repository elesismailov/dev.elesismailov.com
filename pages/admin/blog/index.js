
import AdminHeader from "@/components/AdminHeader";
import ProtectedLayer from "@/components/ProtectedLayer";


export default function AdminBlogPage() {

    return (<ProtectedLayer>
        <AdminHeader />
        <h1>Hello, blog!</h1>
        <p>/admin/blog/</p>
    </ProtectedLayer>)
}