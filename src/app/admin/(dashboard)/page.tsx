import Link from "next/link";
import {
  LayoutTemplate,
  Wrench,
  Image,
  Users,
  Mail,
  FileText,
} from "lucide-react";

const SECTIONS = [
  { key: "hero", label: "Hero", description: "Main headline, subtitle, and CTA", icon: LayoutTemplate },
  { key: "services", label: "Services", description: "Service headings and items", icon: Wrench },
  { key: "portfolio", label: "Portfolio", description: "Project titles and captions", icon: Image },
  { key: "about", label: "About", description: "Company description and badges", icon: Users },
  { key: "contact", label: "Contact", description: "Heading, intro, email, phone", icon: Mail },
  { key: "footer", label: "Footer", description: "Copyright and social links", icon: FileText },
] as const;

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Manage Site Content</h1>
      <p className="mb-8 text-gray-600">
        Edit the text content of each section on your one-pager. Changes are saved to the database
        and appear on the live site immediately.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map(({ key, label, description, icon: Icon }) => (
          <Link
            key={key}
            href={`/admin/edit/${key}`}
            className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:border-orange-200 hover:shadow-md"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
              <Icon size={20} />
            </div>
            <div className="min-w-0">
              <h2 className="font-semibold text-gray-800">{label}</h2>
              <p className="mt-1 text-sm text-gray-500">{description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
