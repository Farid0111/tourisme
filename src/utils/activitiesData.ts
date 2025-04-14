import { Activity } from './types';

export const activitiesData: Activity[] = [
  {
    id: 1,
    title: "Trekking des Gorilles",
    image: "/images/gorilla.jpg",
    images: [
      "/images/gorilla.jpg",
      "/images/volcano.jpg",
      "/images/kigali.jpg"
    ],
    shortDescription: "Partez à la rencontre des gorilles des montagnes dans leur habitat naturel.",
    description: "Le trekking des gorilles au Rwanda est une expérience unique qui vous permettra d'observer ces magnifiques primates dans leur habitat naturel. Accompagné d'un guide expérimenté, vous partirez à la découverte de la forêt dense du parc national des Volcans pour observer une famille de gorilles des montagnes. Cette activité contribue directement à la conservation de cette espèce menacée et au développement des communautés locales.",
    duration: "1 jour",
    region: "Parc National des Volcans",
    price: "1500 USD",
    included: [
      "Permis de trekking",
      "Transport depuis/vers Kigali",
      "Guide anglophone",
      "Bouteille d'eau",
      "Certificat de participation"
    ],
    notIncluded: [
      "Pourboires",
      "Dépenses personnelles",
      "Assurance voyage"
    ],
    accommodationIncluded: false,
    transportIncluded: true,
    mealsIncluded: false,
    featured: true,
    tags: ["wildlife", "nature", "hiking"],
    location: {
      lat: -1.4828,
      lng: 29.4889
    }
  },
  {
    id: 2,
    title: "Safari au Parc Akagera",
    image: "/images/safari.jpg",
    images: [
      "/images/safari.jpg",
      "/images/lake.jpg",
      "/images/kigali.jpg"
    ],
    shortDescription: "Découvrez la faune sauvage du Rwanda dans le parc national d'Akagera.",
    description: "Explorez le magnifique parc national d'Akagera, le seul parc de savane du Rwanda, abritant les Big Five (lion, léopard, rhinocéros, éléphant et buffle). Lors de ce safari, vous découvrirez également des girafes, des zèbres, des antilopes et de nombreuses espèces d'oiseaux. Le parc offre des paysages variés, des plaines aux lacs, en passant par des zones marécageuses.",
    duration: "2 jours",
    region: "Parc National de l'Akagera",
    price: "350 USD",
    included: [
      "Entrée au parc",
      "Véhicule 4x4 avec chauffeur-guide",
      "Hébergement en lodge",
      "Repas complets pendant le safari"
    ],
    notIncluded: [
      "Pourboires",
      "Boissons alcoolisées",
      "Dépenses personnelles"
    ],
    accommodationIncluded: true,
    transportIncluded: true,
    mealsIncluded: true,
    tags: ["wildlife", "safari", "photography"],
    location: {
      lat: -1.9085,
      lng: 30.7426
    }
  },
  {
    id: 3,
    title: "Tour de la Ville de Kigali",
    image: "/images/kigali.jpg",
    images: [
      "/images/kigali.jpg",
      "/images/food.jpg",
      "/images/hotel.jpg"
    ],
    shortDescription: "Explorez la capitale rwandaise et découvrez son histoire fascinante.",
    description: "Découvrez Kigali, l'une des villes les plus propres et les plus sûres d'Afrique. Cette visite vous emmènera au Mémorial du génocide, au marché de Kimironko, au quartier musulman de Nyamirambo et dans des galeries d'art locales. Vous en apprendrez davantage sur l'histoire du Rwanda, sa culture et son développement remarquable après le génocide de 1994.",
    duration: "1 jour",
    region: "Kigali",
    price: "80 USD",
    included: [
      "Guide francophone ou anglophone",
      "Transport en voiture privée",
      "Entrées aux sites",
      "Déjeuner dans un restaurant local"
    ],
    notIncluded: [
      "Pourboires",
      "Achats personnels"
    ],
    accommodationIncluded: false,
    transportIncluded: true,
    mealsIncluded: true,
    tags: ["culture", "history", "city"],
    location: {
      lat: -1.9403,
      lng: 30.0618
    }
  },
  {
    id: 4,
    title: "Randonnée au Volcan Bisoke",
    image: "/images/volcano.jpg",
    images: [
      "/images/volcano.jpg",
      "/images/gorilla.jpg",
      "/images/lake.jpg"
    ],
    shortDescription: "Grimpez au sommet du volcan Bisoke et admirez son magnifique lac de cratère.",
    description: "Partez pour une randonnée aventureuse au mont Bisoke, un volcan culminant à 3711 mètres d'altitude. Au sommet, vous serez récompensé par la vue spectaculaire d'un lac de cratère. La randonnée traverse différents écosystèmes, des forêts de bambous aux prairies alpines, offrant des occasions d'observer la flore unique et potentiellement des singes dorés et d'autres animaux.",
    duration: "1 jour",
    region: "Parc National des Volcans",
    price: "75 USD",
    included: [
      "Permis d'entrée au parc",
      "Guide de randonnée",
      "Bâton de marche",
      "Eau"
    ],
    notIncluded: [
      "Transport vers/depuis le point de départ",
      "Équipement de randonnée",
      "Repas"
    ],
    accommodationIncluded: false,
    transportIncluded: false,
    mealsIncluded: false,
    tags: ["hiking", "nature", "adventure"]
  },
  {
    id: 5,
    title: "Excursion au Lac Kivu",
    image: "/images/lake.jpg",
    images: [
      "/images/lake.jpg",
      "/images/kayak.jpg",
      "/images/food.jpg"
    ],
    shortDescription: "Détendez-vous sur les rives du magnifique Lac Kivu et explorez ses îles.",
    description: "Profitez de la beauté tranquille du lac Kivu, l'un des Grands Lacs africains. Cette excursion comprend une croisière en bateau vers des îles pittoresques, la possibilité de nager dans les eaux claires du lac, et la découverte des charmants villages de pêcheurs. Vous pourrez également vous détendre sur les plages de sable et déguster du poisson frais.",
    duration: "3 jours",
    region: "Ouest",
    price: "450 USD",
    included: [
      "Hébergement en hôtel vue lac",
      "Petit-déjeuner quotidien",
      "Excursion en bateau",
      "Transport aller-retour depuis Kigali"
    ],
    notIncluded: [
      "Déjeuners et dîners",
      "Activités optionnelles (kayak, vélo)",
      "Pourboires",
      "Dépenses personnelles"
    ],
    accommodationIncluded: true,
    transportIncluded: true,
    mealsIncluded: false,
    tags: ["relaxation", "nature", "water"],
    location: {
      lat: -1.7325,
      lng: 29.2732
    }
  },
  {
    id: 6,
    title: "Immersion culturelle dans un village traditionnel",
    image: "/images/immersion.jpg",
    images: [
      "/images/immersion.jpg",
      "/images/food.jpg",
      "/images/kigali.jpg"
    ],
    shortDescription: "Découvrez la vie quotidienne et les traditions du Rwanda rural.",
    description: "Vivez une expérience authentique dans un village rwandais traditionnel. Vous participerez aux activités quotidiennes comme la préparation des repas, l'agriculture, la fabrication d'artisanat local et la danse traditionnelle. Cette immersion vous permettra de découvrir la richesse culturelle du Rwanda et d'établir des liens avec les habitants locaux.",
    duration: "1 jour",
    region: "Est",
    price: "120 USD",
    included: [
      "Transport aller-retour",
      "Guide interprète",
      "Repas traditionnel",
      "Activités culturelles",
      "Démonstration de danse Intore"
    ],
    notIncluded: [
      "Achats d'artisanat",
      "Pourboires"
    ],
    accommodationIncluded: false,
    transportIncluded: true,
    mealsIncluded: true,
    tags: ["culture", "community", "traditional"]
  },
  {
    id: 7,
    title: "Kayak sur le Lac Kivu",
    image: "/images/kayak.jpg",
    images: [
      "/images/kayak.jpg",
      "/images/lake.jpg",
      "/images/food.jpg"
    ],
    shortDescription: "Pagayez sur les eaux tranquilles du lac Kivu et découvrez ses baies cachées.",
    description: "Cette aventure en kayak vous emmène sur les eaux calmes du lac Kivu, où vous pourrez explorer des baies isolées, visiter de petites îles et observer les oiseaux aquatiques. Le parcours offre des vues magnifiques sur les collines environnantes et les villages de pêcheurs. Une expérience parfaite pour les amateurs de plein air et d'activités nautiques.",
    duration: "1 jour",
    region: "Ouest",
    price: "90 USD",
    included: [
      "Équipement de kayak",
      "Guide expérimenté",
      "Déjeuner pique-nique",
      "Eau et rafraîchissements"
    ],
    notIncluded: [
      "Transport vers/depuis le lac Kivu",
      "Vêtements de rechange",
      "Protection solaire"
    ],
    accommodationIncluded: false,
    transportIncluded: false,
    mealsIncluded: true,
    tags: ["adventure", "water", "sport"]
  },
  {
    id: 8,
    title: "Visite gastronomique à Kigali",
    image: "/images/food.jpg",
    images: [
      "/images/food.jpg",
      "/images/kigali.jpg",
      "/images/hotel.jpg"
    ],
    shortDescription: "Découvrez les saveurs uniques de la cuisine rwandaise.",
    description: "Explorez les saveurs uniques de la cuisine rwandaise en visitant des restaurants locaux et en dégustant des plats traditionnels. Vous découvrirez des plats variés, des spécialités locales et des épices inédites.",
    duration: "1 jour",
    region: "Kigali",
    price: "50 USD",
    included: [
      "Guide gastronomique",
      "Transport en voiture privée",
      "Déjeuner dans des restaurants locaux",
      "Dégustation de plats traditionnels"
    ],
    notIncluded: [
      "Boissons alcoolisées",
      "Dépenses personnelles"
    ],
    accommodationIncluded: false,
    transportIncluded: true,
    mealsIncluded: true,
    tags: ["food", "culinary", "culture"]
  },
  {
    id: 9,
    title: "Circuit des lacs du Rwanda",
    image: "/images/circuitlac.jpg",
    images: [
      "/images/circuitlac.jpg",
      "/images/lake.jpg",
      "/images/kayak.jpg"
    ],
    shortDescription: "Explorez les magnifiques lacs du Rwanda lors d'un circuit complet.",
    description: "Ce circuit vous emmène à la découverte des plus beaux lacs du Rwanda : Kivu, Burera, Ruhondo et Muhazi. Vous admirerez des paysages variés, visiterez des villages pittoresques et profiterez de différentes activités nautiques. Ce voyage offre un équilibre parfait entre aventure, culture et détente dans les plus beaux décors naturels du pays.",
    duration: "5 jours",
    region: "Nord",
    price: "850 USD",
    included: [
      "Hébergement en hôtels confortables",
      "Tous les transports",
      "Petit-déjeuner quotidien",
      "Guide touristique professionnel",
      "Activités nautiques de base"
    ],
    notIncluded: [
      "Déjeuners et dîners",
      "Activités optionnelles",
      "Dépenses personnelles"
    ],
    accommodationIncluded: true,
    transportIncluded: true,
    mealsIncluded: false,
    featured: true,
    tags: ["nature", "scenic", "multiple destinations"]
  },
  {
    id: 10,
    title: "Observation des oiseaux à Akagera",
    image: "/images/oiseau.jpg",
    images: [
      "/images/oiseau.jpg",
      "/images/safari.jpg",
      "/images/lake.jpg"
    ],
    shortDescription: "Partez à la découverte de la riche avifaune du parc national d'Akagera.",
    description: "Le parc national d'Akagera abrite plus de 500 espèces d'oiseaux, ce qui en fait un paradis pour les ornithologues. Cette excursion spécialisée vous permettra d'observer de nombreuses espèces, des rapaces majestueux aux colorés martin-pêcheurs, en passant par les rares shoebills. Un guide ornithologue vous accompagnera pour identifier les espèces et vous fournir des informations détaillées.",
    duration: "2 jours",
    region: "Parc National de l'Akagera",
    price: "300 USD",
    included: [
      "Entrée au parc",
      "Guide ornithologue spécialisé",
      "Hébergement en lodge",
      "Jumelles et guides d'identification",
      "Transport dans le parc"
    ],
    notIncluded: [
      "Transport vers/depuis Kigali",
      "Équipement photographique",
      "Pourboires"
    ],
    accommodationIncluded: true,
    transportIncluded: false,
    mealsIncluded: true,
    tags: ["wildlife", "birdwatching", "nature"]
  }
]; 