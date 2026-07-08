"use client";

import { useState } from 'react';

interface OrgNodeProps {
  title: string;
  subtitle?: string;
  color: string;
  textColor?: string;
  children?: React.ReactNode;
  expanded?: boolean;
  width?: string;
  depth?: number;
  id?: string;
  border?: string;
}

const OrgNode: React.FC<OrgNodeProps> = ({
  title,
  subtitle,
  color,
  textColor = "text-white",
  children,
  expanded = true,
  width = "max-w-xs",
  depth = 0,
  id,
  border
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [isActive, setIsActive] = useState(false);

  const nodeId = id || `node-${title.toLowerCase().replace(/\s+/g, '-')}`;
  const contentId = `content-${nodeId}`;

  // Déterminer la bordure en fonction de la couleur de fond
  const determineBorder = () => {
    if (border) return border;
    if (color === "bg-white") return "border border-gray-300";
    return "";
  };

  const handleClick = () => {
    if (children) {
      setIsExpanded(!isExpanded);
      setIsActive(!isActive);

      // Effet visuel temporaire
      setTimeout(() => {
        setIsActive(false);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div
        className={`p-3 rounded-lg ${color} ${textColor} text-center w-full ${width} shadow-md ${determineBorder()}
                   ${children ? "cursor-pointer hover:opacity-90 hover:shadow-lg transition-all duration-300" : ""}
                   ${isActive ? "ring-4 ring-blue-300 ring-opacity-70" : ""}`}
        onClick={handleClick}
        role={children ? "button" : "presentation"}
        aria-expanded={children ? isExpanded : undefined}
        aria-controls={children ? contentId : undefined}
        tabIndex={children ? 0 : -1}
        id={nodeId}
        onKeyDown={(e) => {
          if (children && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        <h3 className="font-bold">{title}</h3>
        {subtitle && <p className="text-sm mt-1">{subtitle}</p>}
        {children && (
          <div
            className="mt-1 text-xs transition-transform duration-300"
            style={{ transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)' }}
            aria-hidden="true"
          >
            ▼
          </div>
        )}
      </div>

      {children && (
        <div
          id={contentId}
          className={`mt-4 w-full overflow-hidden transition-all duration-500 ease-in-out`}
          style={{
            maxHeight: isExpanded ? '2000px' : '0',
            opacity: isExpanded ? 1 : 0,
            marginTop: isExpanded ? '1rem' : '0'
          }}
          aria-hidden={!isExpanded}
        >
          {children}
        </div>
      )}
    </div>
  );
};

interface ConnectorProps {
  type?: 'vertical' | 'horizontal' | 'vertical-down';
  length?: 'short' | 'medium' | 'long';
  width?: string;
}

const Connector: React.FC<ConnectorProps> = ({
  type = 'vertical',
  length = 'medium',
  width = 'w-16'
}) => {
  const getHeightClass = () => {
    switch (length) {
      case 'short': return 'h-4';
      case 'long': return 'h-12';
      default: return 'h-8';
    }
  };

  if (type === 'horizontal') {
    return <div className={`border-t-2 border-gray-400 ${width} mx-auto my-2`}></div>;
  } else if (type === 'vertical-down') {
    return (
      <div className="flex flex-col items-center">
        <div className={`border-l-2 border-gray-400 ${getHeightClass()}`}></div>
        <div className="border-l-2 border-b-2 border-gray-400 w-8 h-4 rounded-b-lg"></div>
      </div>
    );
  } else {
    return <div className={`border-l-2 border-gray-400 ${getHeightClass()} mx-auto my-2`}></div>;
  }
};

const Organigramme = () => {
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[1024px] w-full p-4">
        <div className="flex flex-col items-center w-full">
          {/* Niveau 1: CA */}
          <OrgNode
            title="Le Conseil d'Administration (CA)"
            color="bg-slate-600"
            width="w-64"
          />

          <Connector />

          {/* Niveau 2: Collège des Commissaires aux Comptes et Cabinet & Secrétariat du CA */}
          <div className="flex flex-col items-center w-full">
            <div className="flex items-center justify-center w-full space-x-32 mb-2">
              <div className="flex-1 flex justify-end">
                <OrgNode
                  title="Cabinet & Secrétariat du CA"
                  color="bg-blue-600"
                  width="w-64"
                />
              </div>
              <div className="flex-1">
                <OrgNode
                  title="Collège des Commissaires aux Comptes"
                  color="bg-rose-800"
                  width="w-64"
                />
              </div>
            </div>

            {/* Ligne horizontale connectant les deux boîtes */}
            <Connector type="horizontal" width="w-96" />
          </div>

          <Connector />

          {/* Niveau 3: Direction générale */}
          <OrgNode
            title="Direction générale"
            subtitle="DG & DGA"
            color="bg-blue-900"
            width="w-64"
          />

          <Connector />

          {/* Niveau 4: Cellules et Cabinets sous DG */}
          <div className="grid grid-cols-3 gap-4 w-full">
            <div className="flex flex-col items-center">
              <OrgNode
                title="Cellule de Passation des Marchés Publics"
                color="bg-red-300"
                textColor="text-gray-800"
                width="w-64"
              />
            </div>
            <div className="flex flex-col items-center">
              <div className="flex flex-col gap-4 w-full">
                <OrgNode
                  title="Cabinet & Secrétariat du DG"
                  color="bg-blue-600"
                  width="w-64"
                />
                <OrgNode
                  title="Cabinet & Secrétariat du DGA"
                  color="bg-blue-600"
                  width="w-64"
                />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <OrgNode
                title="Cellule d'Audit Interne"
                color="bg-yellow-300"
                textColor="text-gray-800"
                width="w-64"
              />
            </div>
          </div>

          <Connector />

          {/* Niveau 5: Directions */}
          <div className="grid grid-cols-4 gap-4 w-full">
            <div className="flex flex-col items-center">
              <OrgNode
                title="DF"
                subtitle="(Direction des Finances)"
                color="bg-blue-300"
                textColor="text-gray-800"
                width="w-full max-w-[250px]"
              >
                <div className="space-y-2">
                  <OrgNode
                    title="Division Comptabilité"
                    color="bg-white"
                    textColor="text-gray-800"
                    border="border border-gray-300"
                  />
                  <OrgNode
                    title="Division de la Trésorerie"
                    color="bg-white"
                    textColor="text-gray-800"
                    border="border border-gray-300"
                  />
                  <OrgNode
                    title="Division Suivi et Évaluation"
                    color="bg-white"
                    textColor="text-gray-800"
                    border="border border-gray-300"
                  />
                  <OrgNode
                    title="Division Ressources"
                    color="bg-white"
                    textColor="text-gray-800"
                    border="border border-gray-300"
                  />
                  <OrgNode
                    title="Division Recouvrement"
                    color="bg-white"
                    textColor="text-gray-800"
                    border="border border-gray-300"
                  />
                  <div className="bg-blue-50 p-2 rounded mt-2">
                    <ul className="text-sm text-gray-700 list-disc pl-4">
                      <li>Secrétaire de Direction</li>
                      <li>Opérateur de Saisie</li>
                      <li>Huissier</li>
                    </ul>
                  </div>
                </div>
              </OrgNode>
            </div>

            <div className="flex flex-col items-center">
              <OrgNode
                title="DRHGC"
                subtitle="(Direction Ressources Humaines et Gestion de Carrières)"
                color="bg-purple-400"
                textColor="text-white"
                width="w-full max-w-[250px]"
              >
                <div className="space-y-2">
                  <OrgNode
                    title="Division Ressources Humaines"
                    color="bg-white"
                    textColor="text-gray-800"
                    border="border border-gray-300"
                  >
                    <div className="bg-blue-50 p-2 rounded mt-2">
                      <ul className="text-sm text-gray-700 list-disc pl-4">
                        <li>Service Paie</li>
                        <li>Service Gestion de Carrières et Recrutements</li>
                      </ul>
                    </div>
                  </OrgNode>
                  <OrgNode
                    title="Division Développement du Capital Humain"
                    color="bg-white"
                    textColor="text-gray-800"
                    border="border border-gray-300"
                  >
                    <div className="bg-blue-50 p-2 rounded mt-2">
                      <ul className="text-sm text-gray-700 list-disc pl-4">
                        <li>Service Formation du Personnel</li>
                        <li>Service Contrôle du Personnel</li>
                      </ul>
                    </div>
                  </OrgNode>
                  <div className="bg-blue-50 p-2 rounded mt-2">
                    <ul className="text-sm text-gray-700 list-disc pl-4">
                      <li>Secrétaire de Direction</li>
                      <li>Opérateur de Saisie</li>
                      <li>Réceptionnistes</li>
                      <li>Chauffeurs</li>
                      <li>Huissiers</li>
                      <li>Entretien</li>
                      <li>Sécurité</li>
                    </ul>
                  </div>
                </div>
              </OrgNode>
            </div>

            <div className="flex flex-col items-center">
              <OrgNode
                title="DT"
                subtitle="(Direction Technique)"
                color="bg-blue-400"
                textColor="text-white"
                width="w-full max-w-[250px]"
              >
                <div className="space-y-2">
                  <OrgNode
                    title="Division Infrastructures Sanitaires"
                    color="bg-white"
                    textColor="text-gray-800"
                    border="border border-gray-300"
                  >
                    <div className="bg-blue-50 p-2 rounded mt-2">
                      <ul className="text-sm text-gray-700 list-disc pl-4">
                        <li>Service Evaluation et Planification</li>
                        <li>Service Suivi, Contrôle et Conformité</li>
                      </ul>
                    </div>
                  </OrgNode>
                  <OrgNode
                    title="Division Equipements"
                    color="bg-white"
                    textColor="text-gray-800"
                    border="border border-gray-300"
                  >
                    <div className="bg-blue-50 p-2 rounded mt-2">
                      <ul className="text-sm text-gray-700 list-disc pl-4">
                        <li>Service Evaluation et Planification</li>
                        <li>Service Suivi, Contrôle et Conformité</li>
                      </ul>
                    </div>
                  </OrgNode>
                  <OrgNode
                    title="Division Médicaments et Intrants"
                    color="bg-white"
                    textColor="text-gray-800"
                    border="border border-gray-300"
                  >
                    <div className="bg-blue-50 p-2 rounded mt-2">
                      <ul className="text-sm text-gray-700 list-disc pl-4">
                        <li>Service Promotion de la Production Locale</li>
                        <li>Service Approvisionnement</li>
                      </ul>
                    </div>
                  </OrgNode>
                  <OrgNode
                    title="Division Etude et Planification"
                    color="bg-white"
                    textColor="text-gray-800"
                    border="border border-gray-300"
                  />
                  <div className="bg-blue-50 p-2 rounded mt-2">
                    <ul className="text-sm text-gray-700 list-disc pl-4">
                      <li>Secrétaire de Direction</li>
                      <li>Opérateur de Saisie</li>
                      <li>Huissier</li>
                    </ul>
                  </div>
                </div>
              </OrgNode>
            </div>

            <div className="flex flex-col items-center">
              <OrgNode
                title="DGS"
                subtitle="(Direction Gouvernance en Santé)"
                color="bg-orange-400"
                textColor="text-white"
                width="w-full max-w-[250px]"
              >
                <div className="space-y-2">
                  <OrgNode
                    title="Division Renforcement du Système de Santé"
                    color="bg-white"
                    textColor="text-gray-800"
                    border="border border-gray-300"
                  />
                  <OrgNode
                    title="Division Promotion de la Médecine Traditionnelle"
                    color="bg-white"
                    textColor="text-gray-800"
                    border="border border-gray-300"
                  />
                  <OrgNode
                    title="Division Recherche sur le Système de Santé"
                    color="bg-white"
                    textColor="text-gray-800"
                    border="border border-gray-300"
                  />
                  <div className="bg-blue-50 p-2 rounded mt-2">
                    <ul className="text-sm text-gray-700 list-disc pl-4">
                      <li>Secrétaire de Direction</li>
                      <li>Opérateur de Saisie</li>
                      <li>Huissier</li>
                    </ul>
                  </div>
                </div>
              </OrgNode>
            </div>
          </div>

          <Connector length="long" />

          {/* Niveau 6: Directions (suite) */}
          <div className="grid grid-cols-4 gap-4 w-full">
            <div className="flex flex-col items-center">
              <OrgNode
                title="DA"
                subtitle="(Direction Administrative)"
                color="bg-yellow-300"
                textColor="text-gray-800"
                width="w-full max-w-[250px]"
              >
                <div className="space-y-2">
                  <OrgNode
                    title="Division Administrative"
                    color="bg-white"
                    textColor="text-gray-800"
                    border="border border-gray-300"
                  />
                  <OrgNode
                    title="Division Logistiques et Intendance"
                    color="bg-white"
                    textColor="text-gray-800"
                    border="border border-gray-300"
                  >
                    <div className="bg-blue-50 p-2 rounded mt-2">
                      <ul className="text-sm text-gray-700 list-disc pl-4">
                        <li>Service Logistiques</li>
                        <li>Service Intendance</li>
                      </ul>
                    </div>
                  </OrgNode>
                  <div className="bg-blue-50 p-2 rounded mt-2">
                    <ul className="text-sm text-gray-700 list-disc pl-4">
                      <li>Secrétaire de Direction</li>
                      <li>Opérateur de Saisie</li>
                      <li>Huissier</li>
                    </ul>
                  </div>
                </div>
              </OrgNode>
            </div>

            <div className="flex flex-col items-center">
              <OrgNode
                title="DJ"
                subtitle="(Direction Juridique)"
                color="bg-teal-500"
                textColor="text-white"
                width="w-full max-w-[250px]"
              >
                <div className="space-y-2">
                  <OrgNode
                    title="Division de Contractualisation"
                    color="bg-white"
                    textColor="text-gray-800"
                    border="border border-gray-300"
                  />
                  <OrgNode
                    title="Division des Contentieux"
                    color="bg-white"
                    textColor="text-gray-800"
                    border="border border-gray-300"
                  />
                  <div className="bg-blue-50 p-2 rounded mt-2">
                    <ul className="text-sm text-gray-700 list-disc pl-4">
                      <li>Secrétaire de Direction</li>
                      <li>Opérateur de Saisie</li>
                      <li>Huissier</li>
                    </ul>
                  </div>
                </div>
              </OrgNode>
            </div>

            <div className="flex flex-col items-center">
              <OrgNode
                title="DCS"
                subtitle="(Direction Crédit et Subventionnement)"
                color="bg-sky-500"
                textColor="text-white"
                width="w-full max-w-[250px]"
              >
                <div className="space-y-2">
                  <OrgNode
                    title="Division Risques et Crédits"
                    color="bg-white"
                    textColor="text-gray-800"
                    border="border border-gray-300"
                  />
                  <OrgNode
                    title="Division Subventionnement"
                    color="bg-white"
                    textColor="text-gray-800"
                    border="border border-gray-300"
                  />
                  <div className="bg-blue-50 p-2 rounded mt-2">
                    <ul className="text-sm text-gray-700 list-disc pl-4">
                      <li>Secrétaire de Direction</li>
                      <li>Opérateur de Saisie</li>
                      <li>Huissier</li>
                    </ul>
                  </div>
                </div>
              </OrgNode>
            </div>

            <div className="flex flex-col items-center">
              <OrgNode
                title="DSI"
                subtitle="(Direction Système d'Information)"
                color="bg-indigo-400"
                textColor="text-white"
                width="w-full max-w-[250px]"
              >
                <div className="space-y-2">
                  <OrgNode
                    title="Division Informatique"
                    color="bg-white"
                    textColor="text-gray-800"
                    border="border border-gray-300"
                  />
                  <OrgNode
                    title="Division Communication"
                    color="bg-white"
                    textColor="text-gray-800"
                    border="border border-gray-300"
                  />
                  <div className="bg-blue-50 p-2 rounded mt-2">
                    <ul className="text-sm text-gray-700 list-disc pl-4">
                      <li>Secrétaire de Direction</li>
                      <li>Opérateur de Saisie</li>
                      <li>Huissier</li>
                    </ul>
                  </div>
                </div>
              </OrgNode>
            </div>
          </div>

          <Connector length="long" />

          {/* Niveau 7: Directions Régionales */}
          <OrgNode
            title="DR"
            subtitle="(Directions Régionales)"
            color="bg-green-500"
            textColor="text-white"
            width="w-64"
          >
            <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
              <OrgNode
                title="DR - Equateur"
                color="bg-green-100"
                textColor="text-gray-800"

              />
              <OrgNode
                title="DR - Oriental"
                color="bg-green-100"
                textColor="text-gray-800"

              />
              <OrgNode
                title="DR - Kivu"
                color="bg-green-100"
                textColor="text-gray-800"

              />
              <OrgNode
                title="DR - Kasai"
                color="bg-green-100"
                textColor="text-gray-800"

              />
              <OrgNode
                title="DR - Katanga"
                color="bg-green-100"
                textColor="text-gray-800"

              />
              <OrgNode
                title="DR - Ouest"
                color="bg-green-100"
                textColor="text-gray-800"

              />
            </div>
          </OrgNode>
        </div>
      </div>
    </div>
  );
};

export default Organigramme; 