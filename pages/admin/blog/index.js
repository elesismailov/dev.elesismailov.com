
import ProtectedLayer from "@/components/ProtectedLayer";


export default function AdminBlogPage() {

    return (<ProtectedLayer>
        <h1>Hello, blog!</h1>
        <p>/admin/blog/</p>
    </ProtectedLayer>)
}