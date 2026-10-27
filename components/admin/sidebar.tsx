export default function AdminSidebar() {
  return (
    <aside className="w-[240px] bg-slate-900 text-white p-5">
      <h2 className="mb-5 text-lg font-semibold">Admin</h2>

      <nav>
        <ul className="list-none p-0 space-y-3">
          <li>
            <a
              href="/admin"
              className="block text-white hover:text-slate-300 transition-colors"
            >
              Dashboard Admin
            </a>
          </li>
          <li>
            <a
              href="/admin/users"
              className="block text-white hover:text-slate-300 transition-colors"
            >
              Utilisateurs
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
