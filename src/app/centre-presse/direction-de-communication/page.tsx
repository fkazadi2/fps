import MainLayout from "@/components/layout/MainLayout";
import PageHeader from "@/components/layout/PageHeader";
import FeaturedImageBox from "@/components/ui/FeaturedImageBox";
import Image from "next/image";
import { Linkedin, Mail, Mic2, Users } from "lucide-react";

const teamMembers = [
  {
    role: "Directeur de Communication",
    name: "Jenny ODIA VALLIANTE",
    email: "communication@fps.gouv.cd",
    photo: "/images/team-comm/jenny.jpg",
    linkedin: "https://www.linkedin.com/in/jenny-valliante-odia-754129128/",
  },
  {
    role: "Chargé de Communication",
    name: "Jean-Serge ONYUMBE WEDI",
    email: "communication@fps.gouv.cd",
    photo: "/images/team-comm/serge.jpg",
    linkedin: "https://www.linkedin.com/in/jean-serge-onyumbe-wedi-50454b82/",
  },
  {
    role: "Assistante Événementiel",
    name: "Sarah NSIMBA Diamante",
    email: "communication@fps.gouv.cd",
    photo: "/images/team-comm/sarah.jpg",
  },
  {
    role: "Designer",
    name: "Abner MAKGE",
    email: "communication@fps.gouv.cd",
    photo: "/images/team-comm/abner.jpg",
    linkedin: "https://www.linkedin.com/in/abner-makge-0aa7843a3/",
  },
];

export default function DirectionCommunicationPage() {
  return (
    <MainLayout>
      <div className="bg-white">
        <PageHeader
          title="Direction de communication"
          description="Présentation de l’équipe de communication du Fonds de Promotion de la Santé (FPS)"
          backgroundImage="/images/banners/centre-presse/presse.jpg"
          icon={Mic2}
          variant="blue"
          breadcrumbs={[
            { name: "Centre de Presse", href: "/centre-presse" },
            { name: "Direction de communication", href: "/centre-presse/direction-de-communication" },
          ]}
        />


        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[var(--primary)] mb-4">
              Équipe de Communication FPS
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Voici les personnes qui composent la Direction de communication du FPS.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((m) => (
              <div
                key={`${m.role}-${m.name}`}
                className="group bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative w-full aspect-[3/4] bg-gray-100">
                  <Image
                    src={m.photo}
                    alt={m.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-wide text-[var(--danger)]">
                    {m.role}
                  </p>
                  <h3 className="mt-2 text-lg font-extrabold text-gray-900 leading-snug">
                    {m.name}
                  </h3>

                  {m.email && (
                    <a
                      href={`mailto:${m.email}`}
                      className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:underline"
                    >
                      <Mail className="w-4 h-4" />
                      {m.email}
                    </a>
                  )}

                  {m.linkedin && (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#0A66C2] hover:underline"
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

