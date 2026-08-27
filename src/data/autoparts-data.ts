export interface VehicleSelection {
  year: number;
  make: string;
  model: string;
  engine: string;
}

export interface FitmentRule {
  make: string;
  models: string[];
  years: number[];
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  oemNumber: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  stock: number;
  badge?: string;
  isFeatured?: boolean;
  image: string;
  shortDesc: string;
  specs: Record<string, string>;
  fitment: FitmentRule[];
}

export interface Category {
  id: string;
  name: string;
  /** Condensed label for narrow mobile shortcut tiles. */
  shortName?: string;
  icon: string;
  description: string;
  image: string;
  itemCount: string;
}

export interface LifestyleSegment {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  badge: string;
  linkText: string;
}

export interface Brand {
  name: string;
  /** Wordmark text, used as the accessible name and the fallback label. */
  logo: string;
  /**
   * Path to an official logo file under /public/brands (e.g. "/brands/bosch.svg").
   * Optional: when absent, or if the file fails to load, the wall falls back
   * to a monogram tile. Supply files you are licensed to use.
   */
  logoSrc?: string;
  country: string;
  desc: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface PromoSlide {
  id: string;
  eyebrow: string;
  headline: string;
  subhead: string;
  ctaText: string;
  categoryId: string;
  image: string;
}

export interface LinkColumn {
  title: string;
  links: { label: string; categoryId?: string }[];
}

export const VEHICLE_DB = {
  years: [2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015],
  makes: {
    "Toyota": {
      models: {
        "Hilux": ["2.8L Turbo Diesel (1GD-FTV)", "2.4L Diesel (2GD-FTV)", "2.7L Gasolina (2TR-FE)"],
        "Corolla": ["2.0L Dynamic Force (M20A-FKS)", "1.8L Híbrido (2ZR-FXE)", "1.8L Dual VVT-i (2ZR-FE)"],
        "RAV4": ["2.5L Híbrido AWD", "2.0L Gasolina Direct Shift", "2.5L Gasolina 4x4"],
        "Land Cruiser Prado": ["4.0L V6 Gasolina (1GR-FE)", "2.8L Turbo Diesel (1GD-FTV)"],
        "Tacoma": ["3.5L V6 (2GR-FKS)", "2.4L Turbo i-FORCE"]
      }
    },
    "Ford": {
      models: {
        "F-150": ["3.5L EcoBoost V6 Twin-Turbo", "5.0L Ti-VCT V8 Coyote", "2.7L EcoBoost V6", "3.5L PowerBoost Híbrido V6"],
        "Ranger": ["2.0L Bi-Turbo Diesel", "3.0L V6 Turbo Diesel", "2.3L EcoBoost"],
        "Mustang": ["5.0L V8 Coyote GT", "2.3L EcoBoost High Performance"],
        "Explorer": ["2.3L EcoBoost I4", "3.0L EcoBoost V6 ST", "3.3L Híbrido V6"]
      }
    },
    "Chevrolet": {
      models: {
        "Silverado 1500": ["5.3L EcoTec3 V8", "6.2L EcoTec3 V8", "3.0L Duramax Turbo-Diesel I6"],
        "Colorado": ["2.7L Turbo High-Output", "2.8L Duramax Turbo-Diesel"],
        "Tahoe": ["5.3L V8", "6.2L V8", "3.0L Duramax I6"],
        "Tracker / Trax": ["1.2L Turbo I3", "1.0L Turbo I3"]
      }
    },
    "Honda": {
      models: {
        "Civic": ["2.0L i-VTEC", "1.5L VTEC Turbo", "2.0L e:HEV Híbrido"],
        "CR-V": ["1.5L Turbo AWD", "2.0L Híbrido AWD"],
        "Accord": ["1.5L VTEC Turbo", "2.0L e:HEV Híbrido"],
        "Pilot": ["3.5L V6 i-VTEC (285 HP)"]
      }
    },
    "Nissan": {
      models: {
        "Frontier / Navara": ["2.5L Turbo Diesel (YD25)", "3.8L V6 Gasolina", "2.3L Twin-Turbo Diesel"],
        "Sentra": ["2.0L DOHC 16V MR20DD"],
        "X-Trail / Rogue": ["2.5L DOHC 16V", "1.5L VC-Turbo 3-Cil", "1.5L e-POWER Eléctrico/Gasolina"],
        "Patrol": ["5.6L V8 DIG (VK56VD)"]
      }
    },
    "Jeep": {
      models: {
        "Wrangler (JL)": ["3.6L Pentastar V6 eTorque", "2.0L Turbo I4", "6.4L HEMI V8 392", "2.0L 4xe Híbrido Plug-in"],
        "Grand Cherokee": ["3.6L Pentastar V6", "5.7L HEMI V8", "2.0L 4xe PHEV"],
        "Gladiator": ["3.6L Pentastar V6", "3.0L EcoDiesel V6"]
      }
    },
    "BMW": {
      models: {
        "Serie 3 (G20)": ["320i 2.0L Turbo (B48)", "330i 2.0L Turbo (B48)", "M340i xDrive 3.0L Turbo (B58)"],
        "X5 (G05)": ["xDrive40i 3.0L B58", "xDrive50e PHEV", "M60i 4.4L Twin-Turbo V8"]
      }
    }
  }
};

export const CATEGORIES: Category[] = [
  {
    id: "frenos",
    name: "Frenos y Rotores",
    shortName: "Frenos",
    icon: "disc",
    description: "Discos ventilados, pastillas cerámicas, cálipers y líquido DOT4",
    image: "https://images.unsplash.com/photo-1613214150384-14921ff659b2?auto=format&fit=crop&w=600&q=80",
    itemCount: "1,420 repuestos"
  },
  {
    id: "motor",
    name: "Motor y Componentes",
    shortName: "Motor",
    icon: "cog",
    description: "Kits de distribución, bujías de iridio, bobinas, juntas y sensores",
    image: "https://images.unsplash.com/photo-1606577924006-27d39b132ae2?auto=format&fit=crop&w=600&q=80",
    itemCount: "3,850 repuestos"
  },
  {
    id: "suspension",
    name: "Suspensión y Dirección",
    shortName: "Suspensión",
    icon: "activity",
    description: "Amortiguadores a gas, espirales, brazos de control y terminales",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80",
    itemCount: "1,980 repuestos"
  },
  {
    id: "escape",
    name: "Escape y Rendimiento",
    shortName: "Escape",
    icon: "wind",
    description: "Silenciadores deportivos, catalizadores de alto flujo y resonadores",
    image: "https://images.unsplash.com/photo-1556744197-d16436cf529e?auto=format&fit=crop&w=600&q=80",
    itemCount: "860 repuestos"
  },
  {
    id: "electrico",
    name: "Sistema Eléctrico y Baterías",
    shortName: "Baterías",
    icon: "zap",
    description: "Alternadores heavy duty, motores de arranque y baterías AGM",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80",
    itemCount: "1,120 repuestos"
  },
  {
    id: "refrigeracion",
    name: "Refrigeración y Clima",
    shortName: "Clima",
    icon: "thermometer-snowflake",
    description: "Radiadores de aluminio, bombas de agua, termostatos y condensadores",
    image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=600&q=80",
    itemCount: "940 repuestos"
  },
  {
    id: "filtros",
    name: "Filtros y Mantenimiento",
    shortName: "Filtros",
    icon: "filter",
    description: "Filtros de aire de alto flujo, filtros de aceite sintético y cabina",
    image: "https://images.unsplash.com/photo-1577762616603-0be18aaca637?auto=format&fit=crop&w=600&q=80",
    itemCount: "2,310 repuestos"
  },
  {
    id: "iluminacion",
    name: "Iluminación LED y Ópticas",
    shortName: "Luces LED",
    icon: "sun",
    description: "Faros principales LED/Laser, barras auxiliares off-road y pilotos traseros",
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=600&q=80",
    itemCount: "1,050 repuestos"
  }
];

export const LIFESTYLE_SEGMENTS: LifestyleSegment[] = [
  {
    id: "pickups",
    title: "Pickups y Trabajo Pesado",
    subtitle: "Capacidad de arrastre, enganches, suspensiones reforzadas y protección de caja.",
    image: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=700&q=80",
    badge: "Heavy Duty",
    linkText: "Explorar Línea Pickups"
  },
  {
    id: "offroad",
    title: "Aventura 4x4 y Overlanding",
    subtitle: "Kits de elevación, defensas de acero, winches, snorkels y luces de penetración.",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=700&q=80",
    badge: "Trail Rated",
    linkText: "Equipar para Off-Road"
  },
  {
    id: "motos",
    title: "Motos, Enduro y Calle",
    subtitle: "Kits de arrastre, pastillas sinterizadas, escapes de alto flujo y filtros de alto rendimiento.",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=700&q=80",
    badge: "Two Wheels",
    linkText: "Ver Repuestos de Moto"
  },
  {
    id: "atv",
    title: "Cuatrimotos, ATV y UTV",
    subtitle: "Bandas de variador de kevlar, amortiguadores ajustables, rines beadlock y cascos.",
    image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=700&q=80",
    badge: "All-Terrain",
    linkText: "Ver Catálogo ATV/UTV"
  },
  {
    id: "rv",
    title: "Casas Rodantes & RV",
    subtitle: "Frenos eléctricos para remolque, sistemas solares auxiliares, bombas y niveladores.",
    image: "https://images.unsplash.com/photo-1610647929723-a8922852cd44?auto=format&fit=crop&w=700&q=80",
    badge: "Nomad Life",
    linkText: "Accesorios para RV"
  },
  {
    id: "nautica",
    title: "Náutica & Motores Fuera de Borda",
    subtitle: "Hélices de acero inoxidable, bujías marinas, bombas de achique y filtros decantadores.",
    image: "https://images.unsplash.com/photo-1608412217711-ab7d42cf7920?auto=format&fit=crop&w=700&q=80",
    badge: "Marine Grade",
    linkText: "Línea Náutica"
  }
];

export const BRANDS: Brand[] = [
  { name: "Brembo", logo: "BREMBO", country: "Italia", desc: "Sistemas de frenado de alto rendimiento" },
  { name: "Bosch", logo: "BOSCH", country: "Alemania", desc: "Tecnología automotriz y componentes OEM" },
  { name: "ACDelco", logo: "ACDelco", country: "EE.UU.", desc: "Repuestos originales GM y multimarca" },
  { name: "KYB", logo: "KYB", country: "Japón", desc: "Líder mundial en amortiguadores hidráulicos" },
  { name: "Gates", logo: "GATES", country: "EE.UU.", desc: "Correas, mangueras y kits de sincronización" },
  { name: "Denso", logo: "DENSO", country: "Japón", desc: "Bujías de iridio, sensores y aire acondicionado" },
  { name: "Motorcraft", logo: "MOTORCRAFT", country: "EE.UU.", desc: "Línea original Ford y servicio premium" },
  { name: "K&N Engineering", logo: "K&N", country: "EE.UU.", desc: "Filtros de alto flujo y tomas de aire frío" },
  { name: "Borla", logo: "BORLA", country: "EE.UU.", desc: "Sistemas de escape en acero inoxidable T-304" },
  { name: "Bilstein", logo: "BILSTEIN", country: "Alemania", desc: "Amortiguación deportiva y off-road B6/B8" },
  { name: "Valeo", logo: "VALEO", country: "Francia", desc: "Embragues, ópticas y limpiaparabrisas" },
  { name: "NGK / NTK", logo: "NGK", country: "Japón", desc: "Encendido por chispa y sensores de oxígeno" }
];

export const PRODUCTS: Product[] = [
  {
    id: "HZ-BRK-001",
    name: "Juego de Discos de Freno Perforados y Ranurados Brembo X-Line",
    brand: "Brembo",
    category: "frenos",
    oemNumber: "09.C397.13 / 43512-0K090",
    price: 189.99,
    originalPrice: 229.99,
    rating: 4.9,
    reviewsCount: 142,
    stock: 14,
    badge: "Más Vendido",
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1613214150384-14921ff659b2?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Discos ventilados con aleación con alto contenido de carbono para disipación térmica superior y frenado en seco o mojado.",
    specs: {
      "Diámetro exterior": "338 mm",
      "Espesor nominal": "32 mm",
      "Número de barrenos": "6 barrenos",
      "Tratamiento": "Protección UV anticorrosión",
      "Garantía": "2 Años / 40,000 km"
    },
    fitment: [
      { make: "Toyota", models: ["Hilux", "Land Cruiser Prado", "Tacoma"], years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024] },
      { make: "Ford", models: ["Ranger"], years: [2019, 2020, 2021, 2022, 2023] }
    ]
  },
  {
    id: "HZ-ALT-002",
    name: "Alternador Heavy Duty Bosch 180A con Regulador Multifunción",
    brand: "Bosch",
    category: "electrico",
    oemNumber: "AL0854X / 104210-2070",
    price: 245.50,
    originalPrice: 289.00,
    rating: 4.8,
    reviewsCount: 89,
    stock: 8,
    badge: "OEM Calidad",
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Generación de corriente continua estable incluso a bajas revoluciones; ideal para vehículos con accesorios auxiliares y winches.",
    specs: {
      "Amperaje": "180 Amperios",
      "Voltaje": "12V",
      "Polea": "6 Ranuras con desacoplador libre (OAP)",
      "Rotación": "Sentido horario",
      "Garantía": "3 Años sin límite de kilometraje"
    },
    fitment: [
      { make: "Toyota", models: ["Hilux", "Corolla", "RAV4", "Tacoma"], years: [2018, 2019, 2020, 2021, 2022, 2023, 2024] },
      { make: "Honda", models: ["Civic", "CR-V", "Accord"], years: [2017, 2018, 2019, 2020, 2021, 2022] }
    ]
  },
  {
    id: "HZ-SUS-003",
    name: "Kit de 4 Amortiguadores a Gas Monotubo KYB Gas-A-Just High Performance",
    brand: "KYB",
    category: "suspension",
    oemNumber: "554384 / 48510-09X20",
    price: 340.00,
    originalPrice: 395.00,
    rating: 4.9,
    reviewsCount: 208,
    stock: 12,
    badge: "Oferta Destacada",
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Válvulas hidráulicas autorregulables y cámara de gas nitrógeno a alta presión que eliminan la cavitación y garantizan control total.",
    specs: {
      "Tipo": "Monotubo a alta presión de Nitrógeno",
      "Posición": "Delanteros y Traseros (Set Completo)",
      "Recorrido": "+15% mayor resistencia a la fatiga",
      "Vástago": "Cromado micro-pulido endurecido",
      "Garantía": "Garantía de por vida limitada"
    },
    fitment: [
      { make: "Ford", models: ["F-150", "Ranger"], years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024] },
      { make: "Chevrolet", models: ["Silverado 1500", "Colorado", "Tahoe"], years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023] },
      { make: "Toyota", models: ["Hilux", "Tacoma"], years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024] }
    ]
  },
  {
    id: "HZ-EXH-004",
    name: "Silenciador de Alto Rendimiento Borla ProXS en Acero Inoxidable T-304",
    brand: "Borla",
    category: "escape",
    oemNumber: "40359-BOR / CAT-FLOW-99",
    price: 165.00,
    originalPrice: 195.00,
    rating: 5.0,
    reviewsCount: 76,
    stock: 5,
    badge: "Sonido Agresivo",
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1556744197-d16436cf529e?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Diseño recto de flujo continuo patentado que incrementa los caballos de fuerza (+7 a 12 HP) y otorga un tono gutural sin resonancia en cabina.",
    specs: {
      "Material": "Acero inoxidable austenítico T-304",
      "Entrada / Salida": "2.5 pulgadas centro / centro",
      "Configuración": "Flujo bidireccional no reversible",
      "Dimensiones": "Cuerpo ovalado 14 x 4 x 9.5 pulg.",
      "Garantía": "Garantía de 1,000,000 de millas"
    },
    fitment: [
      { make: "Ford", models: ["Mustang", "F-150"], years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024] },
      { make: "Chevrolet", models: ["Silverado 1500", "Tahoe"], years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023] },
      { make: "Jeep", models: ["Wrangler (JL)", "Gladiator"], years: [2018, 2019, 2020, 2021, 2022, 2023, 2024] }
    ]
  },
  {
    id: "HZ-IGN-005",
    name: "Kit de 4 Bobinas de Encendido Directo Denso con Bujías Iridium Power",
    brand: "Denso",
    category: "motor",
    oemNumber: "099700-115 / 90919-02258",
    price: 135.00,
    originalPrice: 155.00,
    rating: 4.9,
    reviewsCount: 164,
    stock: 22,
    badge: "Ahorro de Combustible",
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1606577924006-27d39b132ae2?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Respuesta de aceleración inmediata, menor consumo de combustible y encendido ultra-estable incluso en arranques fríos severos.",
    specs: {
      "Tipo de Electrodo": "Iridio ultrafino de 0.4 mm",
      "Voltaje de Salida": "35,000 Volts",
      "Conector": "4 Pines de cobre estañado",
      "Durabilidad": "Hasta 160,000 km",
      "Garantía": "1 Año"
    },
    fitment: [
      { make: "Toyota", models: ["Corolla", "RAV4", "Hilux"], years: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024] },
      { make: "Honda", models: ["Civic", "CR-V"], years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023] },
      { make: "Nissan", models: ["Sentra", "X-Trail / Rogue"], years: [2017, 2018, 2019, 2020, 2021, 2022, 2023] }
    ]
  },
  {
    id: "HZ-TIM-006",
    name: "Kit Completo de Distribución Gates PowerGrip con Bomba de Agua",
    brand: "Gates",
    category: "motor",
    oemNumber: "TCKWP329 / 13568-39016",
    price: 198.00,
    originalPrice: 230.00,
    rating: 4.8,
    reviewsCount: 95,
    stock: 9,
    badge: "Kit Completo",
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1600661653561-629509216228?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Incluye banda reforzada de EPDM, polea tensora hidráulica, polea guía y bomba de agua con impulsor metálico.",
    specs: {
      "Material Correa": "Compuesto EPDM resistente a altas temperaturas",
      "Componentes": "Correa + Tensor + Guías + Bomba + Sellos",
      "Impulsor Bomba": "Hierro fundido balanceado",
      "Intervalo de Cambio": "100,000 km",
      "Garantía": "Garantía equiparable a equipo original"
    },
    fitment: [
      { make: "Toyota", models: ["Hilux", "Land Cruiser Prado"], years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022] },
      { make: "Ford", models: ["Ranger"], years: [2016, 2017, 2018, 2019, 2020, 2021] },
      { make: "Nissan", models: ["Frontier / Navara"], years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022] }
    ]
  },
  {
    id: "HZ-FIL-007",
    name: "Filtro de Aire de Alto Rendimiento K&N Lavable y Reutilizable",
    brand: "K&N Engineering",
    category: "filtros",
    oemNumber: "33-2477 / 17801-0P051",
    price: 74.99,
    originalPrice: 89.99,
    rating: 4.9,
    reviewsCount: 310,
    stock: 35,
    badge: "Ecológico",
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1577762616603-0be18aaca637?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Diseñado para aumentar el flujo de aire hasta un 50%, proporcionando aceleración más rápida y protección superior del motor.",
    specs: {
      "Medio Filtrante": "Algodón aceitado de 4 capas con malla epoxi",
      "Lavable": "Sí, reutilizable de por vida",
      "Forma": "Panel rectangular directo a caja de filtro original",
      "Garantía": "10 Años / 1 Millón de millas"
    },
    fitment: [
      { make: "Toyota", models: ["Hilux", "Tacoma", "RAV4", "Corolla"], years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024] },
      { make: "Ford", models: ["F-150", "Mustang", "Explorer"], years: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024] },
      { make: "Jeep", models: ["Wrangler (JL)", "Gladiator"], years: [2018, 2019, 2020, 2021, 2022, 2023, 2024] }
    ]
  },
  {
    id: "HZ-LED-008",
    name: "Kit de Faros Principales Bi-LED Laser Beam Pro 24,000 Lúmenes",
    brand: "Valeo",
    category: "iluminacion",
    oemNumber: "VAL-LED-H4-9003 / 81110-52B30",
    price: 119.00,
    originalPrice: 145.00,
    rating: 4.7,
    reviewsCount: 88,
    stock: 18,
    badge: "Ultra Brillante",
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Patrón de corte de luz perfecto sin encandilar al tráfico en contra, con driver Canbus anti-error integrado y disipador de cobre aeroespacial.",
    specs: {
      "Potencia Luminosa": "24,000 Lúmenes (Par)",
      "Temperatura de Color": "6000K Blanco Frío Diamante",
      "Refrigeración": "Ventilador magnético 12,000 RPM + Cobre",
      "Protección": "IP68 a prueba de agua y polvo",
      "Garantía": "2 Años de reemplazo directo"
    },
    fitment: [
      { make: "Toyota", models: ["Hilux", "Corolla", "RAV4", "Tacoma"], years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024] },
      { make: "Nissan", models: ["Frontier / Navara", "Sentra"], years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023] },
      { make: "Honda", models: ["Civic", "CR-V"], years: [2015, 2016, 2017, 2018, 2019, 2020] }
    ]
  },
  {
    id: "HZ-RAD-009",
    name: "Radiador de Aluminio de 2 Hileras All-Aluminum ACDelco Gold",
    brand: "ACDelco",
    category: "refrigeracion",
    oemNumber: "21782 / 16400-0C200",
    price: 178.00,
    originalPrice: 215.00,
    rating: 4.8,
    reviewsCount: 63,
    stock: 7,
    badge: "Refrigeración Eficiente",
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Núcleo soldado al vacío de alta densidad para máxima transferencia calórica, con enfriador de aceite de transmisión integrado.",
    specs: {
      "Material del Núcleo": "Aluminio grado aviación 3003",
      "Número de Filas": "2 Filas sobredimensionadas",
      "Enfriador TOC": "Incluido para transmisión automática",
      "Prueba de Fuga": "100% probado con helio a 45 PSI",
      "Garantía": "2 Años"
    },
    fitment: [
      { make: "Chevrolet", models: ["Silverado 1500", "Colorado", "Tahoe"], years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023] },
      { make: "Toyota", models: ["Hilux", "Land Cruiser Prado", "Tacoma"], years: [2016, 2017, 2018, 2019, 2020, 2021, 2022] }
    ]
  },
  {
    id: "HZ-WIP-010",
    name: "Par de Plumas Limpiaparabrisas Bosch Icon Beam Aerodinámicas",
    brand: "Bosch",
    category: "filtros",
    oemNumber: "26A / 18A-ICON",
    price: 38.50,
    originalPrice: 46.00,
    rating: 4.9,
    reviewsCount: 450,
    stock: 50,
    badge: "Top Valoración",
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Caucho exclusivo fx Dual-Rubber que dura hasta 40% más que otras plumas premium, con alerón aerodinámico para alta velocidad.",
    specs: {
      "Medidas": "26 pulgadas (Conductor) + 18 pulgadas (Copiloto)",
      "Tecnología": "Beam curva de resorte de acero pretensado",
      "Resistencia Térmica": "-30°C a +80°C",
      "Adaptadores": "Multi-clip universal incluido",
      "Garantía": "1 Año"
    },
    fitment: [
      { make: "Toyota", models: ["Hilux", "Corolla", "RAV4", "Tacoma", "Land Cruiser Prado"], years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024] },
      { make: "Ford", models: ["F-150", "Ranger", "Mustang", "Explorer"], years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024] },
      { make: "Chevrolet", models: ["Silverado 1500", "Colorado", "Tahoe", "Tracker / Trax"], years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023] },
      { make: "Honda", models: ["Civic", "CR-V", "Accord", "Pilot"], years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024] },
      { make: "Nissan", models: ["Frontier / Navara", "Sentra", "X-Trail / Rogue", "Patrol"], years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024] },
      { make: "Jeep", models: ["Wrangler (JL)", "Grand Cherokee", "Gladiator"], years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024] },
      { make: "BMW", models: ["Serie 3 (G20)", "X5 (G05)"], years: [2018, 2019, 2020, 2021, 2022, 2023, 2024] }
    ]
  },
  {
    id: "HZ-OIL-011",
    name: "Aceite Sintético de Motor Motorcraft Full Synthetic 5W-30 (Garrafa 5L)",
    brand: "Motorcraft",
    category: "motor",
    oemNumber: "XO-5W30-Q1SP / WSS-M2C961-A1",
    price: 49.99,
    originalPrice: 58.00,
    rating: 4.9,
    reviewsCount: 312,
    stock: 40,
    badge: "Original Ford",
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1607603750909-408e193868c7?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Formulado con aceites base sintéticos de alto índice de viscosidad y aditivos especiales que reducen la fricción y desgaste en motores turboalimentados.",
    specs: {
      "Viscosidad": "SAE 5W-30",
      "Normas": "API SP, ILSAC GF-6A, Ford WSS-M2C961-A1",
      "Contenido": "5 Litros (5.28 Qt)",
      "Protección": "Hasta 15,000 km entre cambios"
    },
    fitment: [
      { make: "Ford", models: ["F-150", "Ranger", "Mustang", "Explorer"], years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024] },
      { make: "Chevrolet", models: ["Silverado 1500", "Colorado"], years: [2016, 2017, 2018, 2019, 2020, 2021, 2022] }
    ]
  },
  {
    id: "HZ-PAD-012",
    name: "Pastillas de Freno Cerámicas Delanteras ACDelco Professional Durastop",
    brand: "ACDelco",
    category: "frenos",
    oemNumber: "17D1367CH / 84434522",
    price: 68.00,
    originalPrice: 82.00,
    rating: 4.8,
    reviewsCount: 119,
    stock: 25,
    badge: "Bajo Polvo",
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Fórmula cerámica avanzada que previene el molesto chillido y mantiene los rines libres del polvo negro de frenado.",
    specs: {
      "Material": "Compuesto cerámico premium sin asbesto",
      "Accesorios": "Láminas antirruido de acero inoxidable incluidas",
      "Posición": "Eje Delantero",
      "Garantía": "1 Año / 25,000 km"
    },
    fitment: [
      { make: "Chevrolet", models: ["Silverado 1500", "Tahoe", "Colorado"], years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023] },
      { make: "Toyota", models: ["Hilux", "Tacoma"], years: [2018, 2019, 2020, 2021, 2022, 2023] }
    ]
  },

  /* ---- Frenos ---- */
  {
    id: "HZ-BRK-013",
    name: "Pastillas de Freno Cerámicas Bosch QuietCast Premium",
    brand: "Bosch",
    category: "frenos",
    oemNumber: "BC1794 / 04465-0K260",
    price: 54.90,
    originalPrice: 69.90,
    rating: 4.7,
    reviewsCount: 231,
    stock: 42,
    badge: "Silencioso",
    image: "https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Pastillas cerámicas con capa de asentamiento aplicada de fábrica para frenado inmediato desde el primer kilómetro.",
    specs: {
      "Material": "Cerámico sin asbesto (NAO)",
      "Capa de asentamiento": "Preaplicada",
      "Herrajes": "Incluidos",
      "Posición": "Eje Delantero",
      "Garantía": "2 Años / 30,000 km"
    },
    fitment: [
      { make: "Toyota", models: ["Corolla", "RAV4", "Hilux"], years: [2017, 2018, 2019, 2020, 2021, 2022, 2023] },
      { make: "Honda", models: ["Civic", "CR-V"], years: [2018, 2019, 2020, 2021, 2022] }
    ]
  },
  {
    id: "HZ-BRK-014",
    name: "Kit de Cálipers de Freno Remanufacturados ACDelco Professional",
    brand: "ACDelco",
    category: "frenos",
    oemNumber: "18FR2652 / 47750-0K040",
    price: 142.00,
    originalPrice: 178.00,
    rating: 4.6,
    reviewsCount: 87,
    stock: 9,
    image: "https://images.unsplash.com/photo-1607603750909-408e193868c7?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Cálipers remanufacturados con sellos nuevos y pistón fosfatado para resistir la corrosión y el desgaste prematuro.",
    specs: {
      "Pistón": "Fosfatado antioxidante",
      "Sellos": "Nuevos de fábrica",
      "Incluye": "Tornillería y bujes deslizantes",
      "Posición": "Eje Delantero",
      "Garantía": "18 Meses"
    },
    fitment: [
      { make: "Chevrolet", models: ["Silverado 1500", "Colorado"], years: [2016, 2017, 2018, 2019, 2020, 2021] },
      { make: "Ford", models: ["F-150", "Ranger"], years: [2017, 2018, 2019, 2020, 2021, 2022] }
    ]
  },
  {
    id: "HZ-BRK-015",
    name: "Líquido de Frenos DOT 4 Alto Punto de Ebullición Bosch ESI6",
    brand: "Bosch",
    category: "frenos",
    oemNumber: "ESI6-32N / 08823-80011",
    price: 18.50,
    rating: 4.8,
    reviewsCount: 412,
    stock: 50,
    badge: "Más Vendido",
    image: "https://images.unsplash.com/photo-1600661653561-629509216228?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Líquido sintético DOT 4 compatible con sistemas ABS y ESP, con punto de ebullición húmedo superior al estándar.",
    specs: {
      "Especificación": "DOT 4 / DOT 3 compatible",
      "Punto ebullición seco": "265 °C",
      "Punto ebullición húmedo": "175 °C",
      "Contenido": "946 ml",
      "Vida útil": "3 años sellado"
    },
    fitment: [
      { make: "Toyota", models: ["Corolla", "Hilux", "RAV4", "Tacoma"], years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024] },
      { make: "Nissan", models: ["Sentra", "Frontier / Navara"], years: [2016, 2017, 2018, 2019, 2020, 2021, 2022] }
    ]
  },
  {
    id: "HZ-BRK-016",
    name: "Discos de Freno Traseros Ventilados Brembo UV Coated",
    brand: "Brembo",
    category: "frenos",
    oemNumber: "09.A417.11 / 42431-0K050",
    price: 156.00,
    originalPrice: 189.00,
    rating: 4.8,
    reviewsCount: 96,
    stock: 16,
    image: "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Discos traseros con recubrimiento UV que protege la campana y el borde contra la corrosión sin afectar la frenada.",
    specs: {
      "Diámetro exterior": "312 mm",
      "Espesor nominal": "20 mm",
      "Tipo": "Ventilado",
      "Recubrimiento": "UV anticorrosión",
      "Garantía": "2 Años / 40,000 km"
    },
    fitment: [
      { make: "Toyota", models: ["RAV4", "Land Cruiser Prado"], years: [2018, 2019, 2020, 2021, 2022, 2023] },
      { make: "Jeep", models: ["Grand Cherokee"], years: [2017, 2018, 2019, 2020, 2021] }
    ]
  },
  {
    id: "HZ-BRK-017",
    name: "Sensor de Desgaste de Pastillas de Freno Delantero Febi",
    brand: "Bosch",
    category: "frenos",
    oemNumber: "FB-34356 / 47770-0E010",
    price: 22.99,
    originalPrice: 29.99,
    rating: 4.5,
    reviewsCount: 64,
    stock: 33,
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Sensor de aviso de desgaste con conector original que enciende el testigo del tablero antes de dañar el disco.",
    specs: {
      "Longitud de cable": "410 mm",
      "Conector": "Original de 2 pines",
      "Posición": "Eje Delantero",
      "Cantidad": "1 pieza",
      "Garantía": "1 Año"
    },
    fitment: [
      { make: "BMW", models: ["Serie 3 (G20)", "X5 (G05)"], years: [2019, 2020, 2021, 2022, 2023] }
    ]
  },

  /* ---- Motor ---- */
  {
    id: "HZ-ENG-018",
    name: "Juego de Bujías de Iridio NGK Laser Iridium (4 piezas)",
    brand: "NGK",
    category: "motor",
    oemNumber: "ILKAR7B11 / 90919-01253",
    price: 62.00,
    originalPrice: 78.00,
    rating: 4.9,
    reviewsCount: 358,
    stock: 47,
    badge: "Más Vendido",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Bujías de electrodo central de iridio de 0.6 mm que mejoran el arranque en frío y estabilizan el ralentí.",
    specs: {
      "Electrodo central": "Iridio 0.6 mm",
      "Electrodo tierra": "Platino",
      "Separación": "1.1 mm preajustada",
      "Cantidad": "4 piezas",
      "Vida útil": "100,000 km"
    },
    fitment: [
      { make: "Toyota", models: ["Corolla", "RAV4", "Tacoma"], years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023] },
      { make: "Honda", models: ["Civic", "Accord", "CR-V"], years: [2017, 2018, 2019, 2020, 2021, 2022] }
    ]
  },
  {
    id: "HZ-ENG-019",
    name: "Bomba de Agua con Polea Gates PowerGrip Heavy Duty",
    brand: "Gates",
    category: "motor",
    oemNumber: "43547BH / 16100-39466",
    price: 118.50,
    originalPrice: 142.00,
    rating: 4.7,
    reviewsCount: 143,
    stock: 12,
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Bomba con rodamiento reforzado y sello mecánico de carburo para servicio pesado y remolque frecuente.",
    specs: {
      "Cuerpo": "Aluminio fundido",
      "Sello": "Carburo de silicio",
      "Impulsor": "7 aspas metálicas",
      "Incluye": "Junta y polea",
      "Garantía": "2 Años"
    },
    fitment: [
      { make: "Toyota", models: ["Hilux", "Land Cruiser Prado"], years: [2016, 2017, 2018, 2019, 2020, 2021, 2022] },
      { make: "Nissan", models: ["Frontier / Navara", "Patrol"], years: [2017, 2018, 2019, 2020, 2021] }
    ]
  },
  {
    id: "HZ-ENG-020",
    name: "Juego de Juntas de Tapa de Válvulas Mahle Original",
    brand: "Bosch",
    category: "motor",
    oemNumber: "VS50673 / 11213-0P011",
    price: 44.99,
    rating: 4.6,
    reviewsCount: 108,
    stock: 28,
    image: "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Juego completo de juntas en caucho de silicona resistente al aceite caliente, con sellos de bujía incluidos.",
    specs: {
      "Material": "Caucho de silicona",
      "Incluye": "Sellos de pozo de bujía",
      "Resistencia térmica": "-40 °C a 230 °C",
      "Piezas": "Kit completo",
      "Garantía": "1 Año"
    },
    fitment: [
      { make: "Toyota", models: ["Corolla", "RAV4"], years: [2016, 2017, 2018, 2019, 2020, 2021] },
      { make: "Honda", models: ["Civic", "Accord"], years: [2016, 2017, 2018, 2019, 2020] }
    ]
  },
  {
    id: "HZ-ENG-021",
    name: "Sensor de Oxígeno Banda Ancha NTK Upstream",
    brand: "NGK",
    category: "motor",
    oemNumber: "24350 / 89467-0K020",
    price: 96.00,
    originalPrice: 119.00,
    rating: 4.7,
    reviewsCount: 176,
    stock: 21,
    image: "https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Sensor lambda de banda ancha con conector original que corrige el consumo y apaga el testigo de motor.",
    specs: {
      "Tipo": "Banda ancha (AFR)",
      "Cables": "4 hilos",
      "Posición": "Antes del catalizador",
      "Conector": "Original sin empalmes",
      "Garantía": "2 Años"
    },
    fitment: [
      { make: "Toyota", models: ["Hilux", "Corolla", "Tacoma"], years: [2016, 2017, 2018, 2019, 2020, 2021, 2022] },
      { make: "Chevrolet", models: ["Silverado 1500", "Colorado"], years: [2017, 2018, 2019, 2020, 2021] }
    ]
  },
  {
    id: "HZ-ENG-022",
    name: "Kit de Cadena de Distribución Completo con Tensores",
    brand: "Gates",
    category: "motor",
    oemNumber: "TCK1055 / 13506-0P010",
    price: 268.00,
    originalPrice: 329.00,
    rating: 4.8,
    reviewsCount: 74,
    stock: 7,
    badge: "Kit Completo",
    image: "https://images.unsplash.com/photo-1577762616603-0be18aaca637?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Kit integral con cadena, guías, tensor hidráulico y engranes para reemplazo completo del tren de distribución.",
    specs: {
      "Incluye": "Cadena, guías, tensor y engranes",
      "Cadena": "Rodillo simple reforzado",
      "Tensor": "Hidráulico",
      "Piezas": "9 componentes",
      "Garantía": "2 Años / 50,000 km"
    },
    fitment: [
      { make: "Toyota", models: ["Hilux", "Land Cruiser Prado"], years: [2016, 2017, 2018, 2019, 2020, 2021] },
      { make: "Ford", models: ["Ranger", "Explorer"], years: [2017, 2018, 2019, 2020, 2021] }
    ]
  },
  {
    id: "HZ-ENG-023",
    name: "Soportes de Motor Hidráulicos Anvibra Reforzados (par)",
    brand: "Bosch",
    category: "motor",
    oemNumber: "AV-9382 / 12361-0P090",
    price: 134.00,
    rating: 4.5,
    reviewsCount: 59,
    stock: 15,
    image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Soportes con cámara hidráulica que absorben la vibración del motor y eliminan el zumbido en ralentí.",
    specs: {
      "Tipo": "Hidráulico relleno",
      "Cuerpo": "Caucho natural vulcanizado",
      "Cantidad": "2 piezas",
      "Posición": "Derecho e izquierdo",
      "Garantía": "18 Meses"
    },
    fitment: [
      { make: "Honda", models: ["Civic", "CR-V", "Accord"], years: [2016, 2017, 2018, 2019, 2020, 2021] }
    ]
  },

  /* ---- Suspensión ---- */
  {
    id: "HZ-SUS-024",
    name: "Amortiguadores Traseros Monroe OESpectrum (par)",
    brand: "KYB",
    category: "suspension",
    oemNumber: "MN-37287 / 48530-0K680",
    price: 168.00,
    originalPrice: 205.00,
    rating: 4.7,
    reviewsCount: 187,
    stock: 19,
    image: "https://images.unsplash.com/photo-1607603750909-408e193868c7?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Amortiguadores con válvula sensible a la calzada que suavizan el camino irregular sin perder control en curva.",
    specs: {
      "Tipo": "Bitubo a gas",
      "Válvula": "Sensible al terreno",
      "Cantidad": "2 piezas",
      "Posición": "Eje Trasero",
      "Garantía": "2 Años / 40,000 km"
    },
    fitment: [
      { make: "Toyota", models: ["Hilux", "Tacoma"], years: [2016, 2017, 2018, 2019, 2020, 2021, 2022] },
      { make: "Nissan", models: ["Frontier / Navara"], years: [2017, 2018, 2019, 2020, 2021] }
    ]
  },
  {
    id: "HZ-SUS-025",
    name: "Bases de Amortiguador con Rodamiento KYB Strut Mount",
    brand: "KYB",
    category: "suspension",
    oemNumber: "SM5771 / 48609-0K030",
    price: 78.50,
    originalPrice: 95.00,
    rating: 4.6,
    reviewsCount: 122,
    stock: 24,
    image: "https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Bases con rodamiento sellado que eliminan el chasquido al girar el volante y restauran el aislamiento de ruido.",
    specs: {
      "Rodamiento": "Sellado de bolas",
      "Cuerpo": "Caucho reforzado con acero",
      "Cantidad": "2 piezas",
      "Posición": "Eje Delantero",
      "Garantía": "1 Año"
    },
    fitment: [
      { make: "Toyota", models: ["Corolla", "RAV4"], years: [2016, 2017, 2018, 2019, 2020, 2021, 2022] },
      { make: "Honda", models: ["Civic", "CR-V"], years: [2017, 2018, 2019, 2020, 2021] }
    ]
  },
  {
    id: "HZ-SUS-026",
    name: "Terminales de Dirección Exteriores Moog Problem Solver",
    brand: "KYB",
    category: "suspension",
    oemNumber: "ES800976 / 45046-0K060",
    price: 58.00,
    rating: 4.8,
    reviewsCount: 264,
    stock: 38,
    badge: "Más Vendido",
    image: "https://images.unsplash.com/photo-1600661653561-629509216228?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Terminales con perno de presión y engrasador que prolongan la vida útil y mantienen la alineación estable.",
    specs: {
      "Tipo": "Exterior con engrasador",
      "Perno": "Acero forjado tratado",
      "Cantidad": "2 piezas",
      "Cubrepolvo": "Neopreno reforzado",
      "Garantía": "2 Años"
    },
    fitment: [
      { make: "Chevrolet", models: ["Silverado 1500", "Colorado", "Tahoe"], years: [2016, 2017, 2018, 2019, 2020, 2021, 2022] },
      { make: "Ford", models: ["F-150", "Ranger"], years: [2017, 2018, 2019, 2020, 2021, 2022] }
    ]
  },
  {
    id: "HZ-SUS-027",
    name: "Kit de Bujes de Barra Estabilizadora Poliuretano Energy",
    brand: "KYB",
    category: "suspension",
    oemNumber: "EN-98115 / 48815-0K090",
    price: 42.99,
    originalPrice: 54.99,
    rating: 4.5,
    reviewsCount: 91,
    stock: 31,
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Bujes de poliuretano que reducen el balanceo de carrocería y no se deforman como el caucho original.",
    specs: {
      "Material": "Poliuretano 85A",
      "Incluye": "Grasa de silicona",
      "Cantidad": "4 piezas",
      "Posición": "Delantera",
      "Garantía": "De por vida"
    },
    fitment: [
      { make: "Jeep", models: ["Wrangler (JL)", "Gladiator"], years: [2018, 2019, 2020, 2021, 2022, 2023] }
    ]
  },
  {
    id: "HZ-SUS-028",
    name: "Rótulas de Suspensión Inferiores Heavy Duty (par)",
    brand: "KYB",
    category: "suspension",
    oemNumber: "K80026 / 43330-0K010",
    price: 89.00,
    originalPrice: 112.00,
    rating: 4.7,
    reviewsCount: 138,
    stock: 17,
    image: "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Rótulas forjadas con precarga por resorte que compensan el desgaste y eliminan el juego en la dirección.",
    specs: {
      "Cuerpo": "Acero forjado",
      "Precarga": "Resorte compensador",
      "Cantidad": "2 piezas",
      "Posición": "Inferior delantera",
      "Garantía": "2 Años"
    },
    fitment: [
      { make: "Toyota", models: ["Hilux", "Land Cruiser Prado", "Tacoma"], years: [2016, 2017, 2018, 2019, 2020, 2021, 2022] }
    ]
  },

  /* ---- Eléctrico ---- */
  {
    id: "HZ-ELE-029",
    name: "Batería AGM de Ciclo Profundo Optima 12V 800 CCA",
    brand: "Bosch",
    category: "electrico",
    oemNumber: "OPT-34R / 28800-0K120",
    price: 289.00,
    originalPrice: 349.00,
    rating: 4.8,
    reviewsCount: 421,
    stock: 11,
    badge: "Más Vendido",
    image: "https://images.unsplash.com/photo-1607603750909-408e193868c7?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Batería AGM sellada de placas espirales, resistente a la vibración y con arranque confiable en frío extremo.",
    specs: {
      "Tecnología": "AGM espiral sellada",
      "Voltaje": "12 V",
      "Arranque en frío": "800 CCA",
      "Capacidad de reserva": "120 minutos",
      "Garantía": "3 Años"
    },
    fitment: [
      { make: "Ford", models: ["F-150", "Ranger", "Explorer"], years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023] },
      { make: "Chevrolet", models: ["Silverado 1500", "Tahoe"], years: [2017, 2018, 2019, 2020, 2021, 2022] }
    ]
  },
  {
    id: "HZ-ELE-030",
    name: "Motor de Arranque Reforzado Denso Gear Reduction",
    brand: "Denso",
    category: "electrico",
    oemNumber: "280-0356 / 28100-0K090",
    price: 232.00,
    originalPrice: 279.00,
    rating: 4.7,
    reviewsCount: 96,
    stock: 8,
    image: "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Arrancador con reducción de engranes que entrega mayor torque consumiendo menos corriente de la batería.",
    specs: {
      "Tipo": "Reducción de engranes",
      "Potencia": "2.0 kW",
      "Dientes del piñón": "13",
      "Rotación": "Horaria",
      "Garantía": "2 Años"
    },
    fitment: [
      { make: "Toyota", models: ["Hilux", "Land Cruiser Prado"], years: [2016, 2017, 2018, 2019, 2020, 2021] },
      { make: "Nissan", models: ["Frontier / Navara", "Patrol"], years: [2016, 2017, 2018, 2019, 2020] }
    ]
  },
  {
    id: "HZ-ELE-031",
    name: "Cables de Batería Reforzados Calibre 2 con Terminales",
    brand: "Bosch",
    category: "electrico",
    oemNumber: "BC-2AWG / 82122-0K030",
    price: 48.99,
    rating: 4.5,
    reviewsCount: 77,
    stock: 36,
    image: "https://images.unsplash.com/photo-1600661653561-629509216228?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Juego de cables de cobre puro calibre 2 con terminales estañadas que evitan caídas de voltaje al arrancar.",
    specs: {
      "Conductor": "Cobre puro calibre 2",
      "Terminales": "Estañadas anticorrosión",
      "Longitud": "Positivo 90 cm / Negativo 45 cm",
      "Aislamiento": "PVC resistente al aceite",
      "Garantía": "1 Año"
    },
    fitment: [
      { make: "Chevrolet", models: ["Silverado 1500", "Colorado"], years: [2016, 2017, 2018, 2019, 2020, 2021] },
      { make: "Ford", models: ["F-150"], years: [2016, 2017, 2018, 2019, 2020] }
    ]
  },
  {
    id: "HZ-ELE-032",
    name: "Módulo Regulador de Voltaje Denso para Alternador",
    brand: "Denso",
    category: "electrico",
    oemNumber: "RV-27460 / 27700-0K040",
    price: 67.50,
    originalPrice: 84.00,
    rating: 4.6,
    reviewsCount: 63,
    stock: 26,
    image: "https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Regulador con protección contra sobretensión que estabiliza la carga y evita dañar la batería y la electrónica.",
    specs: {
      "Voltaje de regulación": "14.4 V ± 0.2",
      "Protección": "Sobretensión y temperatura",
      "Escobillas": "Incluidas",
      "Montaje": "Atornillable",
      "Garantía": "18 Meses"
    },
    fitment: [
      { make: "Toyota", models: ["Corolla", "Hilux", "RAV4"], years: [2016, 2017, 2018, 2019, 2020, 2021] }
    ]
  },
  {
    id: "HZ-ELE-033",
    name: "Kit de Relevadores y Fusibles Automotrices 12V (surtido)",
    brand: "Bosch",
    category: "electrico",
    oemNumber: "BR-KIT120 / 90987-0K010",
    price: 34.90,
    originalPrice: 44.90,
    rating: 4.4,
    reviewsCount: 154,
    stock: 45,
    image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Surtido de relevadores de 30/40 A y fusibles de cuchilla en estuche organizador para reparaciones eléctricas.",
    specs: {
      "Relevadores": "5 piezas 30/40 A",
      "Fusibles": "120 piezas surtidas",
      "Voltaje": "12 V",
      "Incluye": "Estuche y extractor",
      "Garantía": "1 Año"
    },
    fitment: [
      { make: "Toyota", models: ["Hilux", "Corolla", "RAV4", "Tacoma"], years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023] },
      { make: "Nissan", models: ["Sentra", "X-Trail / Rogue"], years: [2016, 2017, 2018, 2019, 2020, 2021] }
    ]
  },

  /* ---- Filtros ---- */
  {
    id: "HZ-FIL-034",
    name: "Filtro de Aceite Mann-Filter Premium con Válvula Antirretorno",
    brand: "Bosch",
    category: "filtros",
    oemNumber: "W71229 / 90915-YZZE1",
    price: 14.99,
    rating: 4.8,
    reviewsCount: 486,
    stock: 50,
    badge: "Más Vendido",
    image: "https://images.unsplash.com/photo-1606577924006-27d39b132ae2?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Filtro con medio sintético y válvula antirretorno que mantiene presión de aceite inmediata al arrancar.",
    specs: {
      "Medio filtrante": "Sintético multicapa",
      "Válvula antirretorno": "Sí",
      "Eficiencia": "99% a 20 micras",
      "Rosca": "M20 x 1.5",
      "Intervalo": "10,000 km"
    },
    fitment: [
      { make: "Toyota", models: ["Corolla", "RAV4", "Hilux", "Tacoma"], years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024] }
    ]
  },
  {
    id: "HZ-FIL-035",
    name: "Filtro de Cabina de Carbón Activado Bosch HEPA",
    brand: "Bosch",
    category: "filtros",
    oemNumber: "6055C / 87139-0K090",
    price: 26.50,
    originalPrice: 33.90,
    rating: 4.7,
    reviewsCount: 297,
    stock: 41,
    image: "https://images.unsplash.com/photo-1607603750909-408e193868c7?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Filtro de tres capas con carbón activado que retiene polen, hollín y neutraliza olores del tráfico.",
    specs: {
      "Capas": "3 (prefiltro, HEPA, carbón)",
      "Retención": "Polen, PM2.5 y olores",
      "Carbón activado": "Sí",
      "Intervalo": "15,000 km",
      "Garantía": "1 Año"
    },
    fitment: [
      { make: "Toyota", models: ["Corolla", "RAV4", "Hilux"], years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023] },
      { make: "Honda", models: ["Civic", "CR-V", "Accord"], years: [2017, 2018, 2019, 2020, 2021, 2022] }
    ]
  },
  {
    id: "HZ-FIL-036",
    name: "Filtro de Combustible Diésel con Separador de Agua",
    brand: "Bosch",
    category: "filtros",
    oemNumber: "F026402849 / 23390-0L041",
    price: 38.00,
    originalPrice: 47.50,
    rating: 4.7,
    reviewsCount: 168,
    stock: 23,
    image: "https://images.unsplash.com/photo-1600661653561-629509216228?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Filtro con separador que retira el agua del diésel y protege la bomba de inyección de alta presión.",
    specs: {
      "Tipo": "Diésel con separador",
      "Eficiencia": "98% a 5 micras",
      "Separación de agua": "93%",
      "Sensor": "Alojamiento compatible",
      "Intervalo": "20,000 km"
    },
    fitment: [
      { make: "Toyota", models: ["Hilux", "Land Cruiser Prado"], years: [2016, 2017, 2018, 2019, 2020, 2021, 2022] },
      { make: "Ford", models: ["Ranger"], years: [2019, 2020, 2021, 2022, 2023] }
    ]
  },
  {
    id: "HZ-FIL-037",
    name: "Filtro de Transmisión Automática con Junta de Cárter",
    brand: "ACDelco",
    category: "filtros",
    oemNumber: "TF-1290 / 35330-0K030",
    price: 52.00,
    rating: 4.5,
    reviewsCount: 84,
    stock: 18,
    image: "https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Kit de filtro y junta para servicio de transmisión automática, evita fugas y mejora los cambios en frío.",
    specs: {
      "Incluye": "Filtro y junta de cárter",
      "Medio filtrante": "Malla fina y fieltro",
      "Compatibilidad": "Transmisión automática",
      "Intervalo": "60,000 km",
      "Garantía": "1 Año"
    },
    fitment: [
      { make: "Chevrolet", models: ["Silverado 1500", "Tahoe"], years: [2016, 2017, 2018, 2019, 2020, 2021] },
      { make: "Ford", models: ["F-150", "Explorer"], years: [2017, 2018, 2019, 2020, 2021] }
    ]
  },
  {
    id: "HZ-FIL-038",
    name: "Filtro de Aire de Motor Fram Extra Guard Panel",
    brand: "Bosch",
    category: "filtros",
    oemNumber: "CA11258 / 17801-0K090",
    price: 21.99,
    originalPrice: 27.99,
    rating: 4.6,
    reviewsCount: 342,
    stock: 44,
    image: "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Filtro de panel con medio plisado que atrapa polvo fino sin restringir el flujo de aire al motor.",
    specs: {
      "Medio filtrante": "Celulosa plisada",
      "Eficiencia": "96% a 25 micras",
      "Marco": "Uretano flexible",
      "Intervalo": "20,000 km",
      "Garantía": "1 Año"
    },
    fitment: [
      { make: "Toyota", models: ["Corolla", "RAV4", "Hilux"], years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023] },
      { make: "Nissan", models: ["Sentra", "X-Trail / Rogue"], years: [2017, 2018, 2019, 2020, 2021] }
    ]
  },

  /* ---- Refrigeración ---- */
  {
    id: "HZ-REF-039",
    name: "Termostato con Empaque Gates OE Temperature Control",
    brand: "Gates",
    category: "refrigeracion",
    oemNumber: "34715 / 90916-03134",
    price: 28.90,
    originalPrice: 36.00,
    rating: 4.6,
    reviewsCount: 201,
    stock: 39,
    image: "https://images.unsplash.com/photo-1607603750909-408e193868c7?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Termostato calibrado a temperatura original que evita sobrecalentamiento y mejora la respuesta de la calefacción.",
    specs: {
      "Apertura": "82 °C",
      "Incluye": "Empaque de sellado",
      "Cuerpo": "Latón y acero inoxidable",
      "Tipo": "Cera expansiva",
      "Garantía": "2 Años"
    },
    fitment: [
      { make: "Toyota", models: ["Corolla", "Hilux", "RAV4"], years: [2016, 2017, 2018, 2019, 2020, 2021, 2022] },
      { make: "Honda", models: ["Civic", "CR-V"], years: [2017, 2018, 2019, 2020, 2021] }
    ]
  },
  {
    id: "HZ-REF-040",
    name: "Ventilador de Radiador con Motor y Cubierta Completo",
    brand: "Denso",
    category: "refrigeracion",
    oemNumber: "671-0089 / 16711-0K120",
    price: 186.00,
    originalPrice: 228.00,
    rating: 4.5,
    reviewsCount: 68,
    stock: 10,
    image: "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Conjunto de ventilador con motor balanceado y cubierta que restaura el flujo de aire en tráfico lento.",
    specs: {
      "Incluye": "Motor, aspa y cubierta",
      "Aspas": "7 palas",
      "Voltaje": "12 V",
      "Conector": "Original",
      "Garantía": "18 Meses"
    },
    fitment: [
      { make: "Toyota", models: ["Corolla", "RAV4"], years: [2016, 2017, 2018, 2019, 2020, 2021] },
      { make: "Nissan", models: ["Sentra", "X-Trail / Rogue"], years: [2017, 2018, 2019, 2020, 2021] }
    ]
  },
  {
    id: "HZ-REF-041",
    name: "Anticongelante Concentrado Prestone 50/50 Larga Vida",
    brand: "Bosch",
    category: "refrigeracion",
    oemNumber: "AF2100 / 08889-80015",
    price: 24.50,
    rating: 4.7,
    reviewsCount: 389,
    stock: 50,
    image: "https://images.unsplash.com/photo-1606577924006-27d39b132ae2?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Refrigerante prediluido compatible con todas las marcas, protege contra congelamiento y corrosión interna.",
    specs: {
      "Dilución": "Prediluido 50/50",
      "Protección": "-37 °C a 129 °C",
      "Compatibilidad": "Todas las marcas y colores",
      "Contenido": "3.78 L",
      "Vida útil": "5 años / 240,000 km"
    },
    fitment: [
      { make: "Toyota", models: ["Corolla", "Hilux", "RAV4", "Tacoma"], years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024] },
      { make: "Ford", models: ["F-150", "Ranger"], years: [2016, 2017, 2018, 2019, 2020, 2021, 2022] }
    ]
  },
  {
    id: "HZ-REF-042",
    name: "Mangueras de Radiador Superior e Inferior Gates (juego)",
    brand: "Gates",
    category: "refrigeracion",
    oemNumber: "22458 / 16571-0K180",
    price: 62.00,
    originalPrice: 78.00,
    rating: 4.6,
    reviewsCount: 97,
    stock: 22,
    image: "https://images.unsplash.com/photo-1600661653561-629509216228?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Mangueras moldeadas en EPDM reforzado que resisten el calor y la presión sin colapsar a altas revoluciones.",
    specs: {
      "Material": "EPDM con refuerzo textil",
      "Piezas": "2 (superior e inferior)",
      "Resistencia": "150 °C",
      "Moldeado": "Curvatura original",
      "Garantía": "2 Años"
    },
    fitment: [
      { make: "Chevrolet", models: ["Silverado 1500", "Colorado"], years: [2016, 2017, 2018, 2019, 2020, 2021] },
      { make: "Toyota", models: ["Hilux"], years: [2017, 2018, 2019, 2020, 2021] }
    ]
  },
  {
    id: "HZ-REF-043",
    name: "Compresor de Aire Acondicionado Denso con Embrague",
    brand: "Denso",
    category: "refrigeracion",
    oemNumber: "471-1621 / 88320-0K140",
    price: 398.00,
    originalPrice: 465.00,
    rating: 4.6,
    reviewsCount: 54,
    stock: 6,
    image: "https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Compresor nuevo con embrague ensamblado y aceite PAG cargado, listo para instalar y vacío de sistema.",
    specs: {
      "Refrigerante": "R-134a",
      "Aceite": "PAG 46 precargado",
      "Embrague": "Ensamblado de fábrica",
      "Desplazamiento": "140 cc/rev",
      "Garantía": "2 Años"
    },
    fitment: [
      { make: "Toyota", models: ["Hilux", "Land Cruiser Prado"], years: [2016, 2017, 2018, 2019, 2020, 2021] },
      { make: "Nissan", models: ["Frontier / Navara"], years: [2017, 2018, 2019, 2020] }
    ]
  },

  /* ---- Escape ---- */
  {
    id: "HZ-EXH-044",
    name: "Catalizador Universal de Alto Flujo Certificado EPA",
    brand: "Borla",
    category: "escape",
    oemNumber: "BR-94019 / 18450-0K060",
    price: 248.00,
    originalPrice: 298.00,
    rating: 4.5,
    reviewsCount: 71,
    stock: 9,
    image: "https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Catalizador de sustrato metálico que reduce la contrapresión y apaga el testigo de eficiencia del convertidor.",
    specs: {
      "Sustrato": "Metálico de alto flujo",
      "Cuerpo": "Acero inoxidable 409",
      "Entrada / Salida": "2.5 pulgadas",
      "Certificación": "EPA",
      "Garantía": "5 Años / 80,000 km"
    },
    fitment: [
      { make: "Ford", models: ["Mustang", "F-150"], years: [2016, 2017, 2018, 2019, 2020, 2021] },
      { make: "Chevrolet", models: ["Silverado 1500"], years: [2017, 2018, 2019, 2020, 2021] }
    ]
  },
  {
    id: "HZ-EXH-045",
    name: "Punta de Escape Cromada Doble Salida Borla",
    brand: "Borla",
    category: "escape",
    oemNumber: "BR-20158 / 17408-0K020",
    price: 89.00,
    originalPrice: 112.00,
    rating: 4.7,
    reviewsCount: 133,
    stock: 27,
    image: "https://images.unsplash.com/photo-1607603750909-408e193868c7?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Punta doble en acero inoxidable pulido con abrazadera de instalación directa, sin corte ni soldadura.",
    specs: {
      "Material": "Acero inoxidable T-304 pulido",
      "Entrada": "2.5 pulgadas",
      "Salida": "2 x 4 pulgadas",
      "Instalación": "Abrazadera incluida",
      "Garantía": "De por vida"
    },
    fitment: [
      { make: "Ford", models: ["F-150", "Mustang"], years: [2016, 2017, 2018, 2019, 2020, 2021, 2022] },
      { make: "Chevrolet", models: ["Silverado 1500", "Tahoe"], years: [2016, 2017, 2018, 2019, 2020, 2021] }
    ]
  },
  {
    id: "HZ-EXH-046",
    name: "Kit de Empaques y Abrazaderas de Escape Universal",
    brand: "Borla",
    category: "escape",
    oemNumber: "BR-KIT88 / 90917-0K060",
    price: 36.50,
    rating: 4.4,
    reviewsCount: 88,
    stock: 34,
    image: "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Juego de empaques de grafito y abrazaderas en U para sellar uniones de escape sin fugas ni zumbidos.",
    specs: {
      "Empaques": "Grafito reforzado",
      "Abrazaderas": "Acero galvanizado tipo U",
      "Piezas": "8 componentes",
      "Diámetros": "2.25 a 2.5 pulgadas",
      "Garantía": "1 Año"
    },
    fitment: [
      { make: "Toyota", models: ["Hilux", "Tacoma"], years: [2016, 2017, 2018, 2019, 2020, 2021] },
      { make: "Ford", models: ["Ranger", "F-150"], years: [2017, 2018, 2019, 2020, 2021] }
    ]
  },
  {
    id: "HZ-EXH-047",
    name: "Header de Escape Tubular Acero Inoxidable Ceramizado",
    brand: "Borla",
    category: "escape",
    oemNumber: "BR-HD3120 / 17104-0K030",
    price: 456.00,
    originalPrice: 549.00,
    rating: 4.6,
    reviewsCount: 42,
    stock: 5,
    badge: "Alto Rendimiento",
    image: "https://images.unsplash.com/photo-1606577924006-27d39b132ae2?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Múltiple tubular de tubos iguales con recubrimiento cerámico que mejora la evacuación y baja la temperatura de bahía.",
    specs: {
      "Material": "Acero inoxidable 304",
      "Recubrimiento": "Cerámico térmico",
      "Diámetro primario": "1.75 pulgadas",
      "Incluye": "Empaques y tornillería",
      "Garantía": "3 Años"
    },
    fitment: [
      { make: "Ford", models: ["Mustang"], years: [2018, 2019, 2020, 2021, 2022, 2023] }
    ]
  },

  /* ---- Iluminación ---- */
  {
    id: "HZ-LED-048",
    name: "Barra LED Off-Road 32 Pulgadas Combo Beam 18,000 Lúmenes",
    brand: "Valeo",
    category: "iluminacion",
    oemNumber: "VL-BAR32C / 81100-0K250",
    price: 198.00,
    originalPrice: 249.00,
    rating: 4.7,
    reviewsCount: 216,
    stock: 13,
    badge: "Off-Road",
    image: "https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Barra con patrón combinado de inundación y proyección, carcasa de aluminio IP68 y arnés con relevador incluido.",
    specs: {
      "Lúmenes": "18,000 lm",
      "Patrón": "Combo (spot + flood)",
      "Protección": "IP68 sumergible",
      "Carcasa": "Aluminio con disipador",
      "Garantía": "2 Años"
    },
    fitment: [
      { make: "Jeep", models: ["Wrangler (JL)", "Gladiator"], years: [2018, 2019, 2020, 2021, 2022, 2023] },
      { make: "Toyota", models: ["Hilux", "Land Cruiser Prado"], years: [2016, 2017, 2018, 2019, 2020, 2021] }
    ]
  },
  {
    id: "HZ-LED-049",
    name: "Kit de Faros Antiniebla LED Amarillos Alta Penetración",
    brand: "Valeo",
    category: "iluminacion",
    oemNumber: "VL-FOG3000 / 81220-0K180",
    price: 92.00,
    originalPrice: 118.00,
    rating: 4.6,
    reviewsCount: 174,
    stock: 20,
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Antiniebla de 3000K en tono ámbar que penetra la neblina y la lluvia sin reflejar la luz de vuelta al conductor.",
    specs: {
      "Temperatura de color": "3000 K ámbar",
      "Lúmenes": "2,800 lm por faro",
      "Protección": "IP67",
      "Cantidad": "2 piezas",
      "Garantía": "2 Años"
    },
    fitment: [
      { make: "Toyota", models: ["Hilux", "Corolla", "RAV4"], years: [2016, 2017, 2018, 2019, 2020, 2021, 2022] },
      { make: "Nissan", models: ["Frontier / Navara", "X-Trail / Rogue"], years: [2017, 2018, 2019, 2020, 2021] }
    ]
  },
  {
    id: "HZ-LED-050",
    name: "Juego de Calaveras Traseras LED Secuenciales Ahumadas",
    brand: "Valeo",
    category: "iluminacion",
    oemNumber: "VL-TL880S / 81551-0K220",
    price: 285.00,
    originalPrice: 349.00,
    rating: 4.5,
    reviewsCount: 79,
    stock: 8,
    image: "https://images.unsplash.com/photo-1607603750909-408e193868c7?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Calaveras con direccionales secuenciales y lente ahumado, conexión plug and play sin módulos adicionales.",
    specs: {
      "Direccional": "Secuencial dinámica",
      "Lente": "Ahumado policarbonato",
      "Instalación": "Plug and play",
      "Cantidad": "2 piezas",
      "Garantía": "2 Años"
    },
    fitment: [
      { make: "Ford", models: ["Mustang", "F-150"], years: [2018, 2019, 2020, 2021, 2022] }
    ]
  },
  {
    id: "HZ-LED-051",
    name: "Kit de Iluminación Interior LED Blanco Frío (10 piezas)",
    brand: "Valeo",
    category: "iluminacion",
    oemNumber: "VL-INT10 / 81240-0K040",
    price: 32.99,
    originalPrice: 42.99,
    rating: 4.5,
    reviewsCount: 263,
    stock: 46,
    image: "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Set completo de LEDs para cabina, cajuela y guantera con resistencias que evitan el error de foco fundido.",
    specs: {
      "Temperatura de color": "6000 K blanco frío",
      "Piezas": "10 módulos surtidos",
      "Anti-error": "Resistencias CANbus",
      "Consumo": "1.5 W por módulo",
      "Garantía": "1 Año"
    },
    fitment: [
      { make: "Toyota", models: ["Corolla", "RAV4", "Hilux"], years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023] },
      { make: "Honda", models: ["Civic", "CR-V", "Accord"], years: [2017, 2018, 2019, 2020, 2021, 2022] }
    ]
  },
  {
    id: "HZ-LED-052",
    name: "Focos LED H11 de Reemplazo Directo 12,000 Lúmenes (par)",
    brand: "Valeo",
    category: "iluminacion",
    oemNumber: "VL-H11PRO / 90981-0K090",
    price: 78.00,
    originalPrice: 99.00,
    rating: 4.6,
    reviewsCount: 341,
    stock: 29,
    badge: "Más Vendido",
    image: "https://images.unsplash.com/photo-1606577924006-27d39b132ae2?auto=format&fit=crop&w=600&q=80",
    shortDesc: "Focos LED con ventilador integrado y patrón de haz corregido que no deslumbra al tráfico en sentido contrario.",
    specs: {
      "Lúmenes": "12,000 lm por par",
      "Temperatura de color": "6500 K",
      "Disipación": "Ventilador de balineras",
      "Vida útil": "50,000 horas",
      "Garantía": "2 Años"
    },
    fitment: [
      { make: "Toyota", models: ["Corolla", "Hilux", "RAV4", "Tacoma"], years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023] },
      { make: "Chevrolet", models: ["Silverado 1500", "Colorado"], years: [2017, 2018, 2019, 2020, 2021] }
    ]
  }
];

export const FAQS: FaqItem[] = [
  {
    q: "¿Cómo sé con total certeza si una pieza es compatible con mi vehículo?",
    a: "Usa nuestro selector 'Mi Garaje' en la parte superior. Al elegir el Año, Marca, Modelo y Motor de tu coche, nuestro sistema filtra automáticamente los repuestos y mostrará la insignia verde '✓ Compatible con tu vehículo' en cada ficha técnica."
  },
  {
    q: "¿Qué significa que un repuesto sea OEM o Aftermarket de Alto Rendimiento?",
    a: "Las piezas OEM (Original Equipment Manufacturer) son fabricadas bajo los estándares exactos de fábrica de marcas como Toyota, Ford o GM (ej. Bosch, ACDelco, Denso). Las piezas Aftermarket de rendimiento (ej. Brembo, Borla, K&N) superan los requerimientos originales ofreciendo mayor durabilidad o potencia."
  },
  {
    q: "¿Cómo funciona la garantía de ajuste perfecto 'Haztap Fit Guarantee'?",
    a: "Si ingresaste tu vehículo con nuestro selector y la pieza que recibiste no calza al 100%, cubrimos la devolución inmediata con guía prepagada y te enviamos la refacción correcta sin ningún costo adicional."
  },
  {
    q: "¿Cuáles son los tiempos y costos de envío?",
    a: "Ofrecemos envío exprés a todo el país en 24-48 horas hábiles. Todos los pedidos superiores a $99 USD califican automáticamente para Envío Gratis asegurado."
  },
  {
    q: "¿Puedo guardar múltiples vehículos en mi perfil?",
    a: "¡Sí! Puedes registrar varios automóviles, camionetas o motos en 'Mi Garaje' y alternar entre ellos con un solo clic para comprar refacciones de toda tu flota familiar o de trabajo."
  }
];

export interface RatingBreakdown {
  stars: number;
  count: number;
  pct: number;
}

/**
 * Star distribution implied by a product's average rating and review count.
 * Derived rather than stored so it always agrees with the numbers shown.
 */
export function getRatingBreakdown(product: Product): RatingBreakdown[] {
  const { rating, reviewsCount } = product;
  // Weight each star bucket by how close it sits to the average, which
  // yields the top-heavy curve typical of real review distributions.
  const weights = [5, 4, 3, 2, 1].map(s => 1 / (1 + Math.pow(Math.abs(s - rating), 2.6)));
  const sum = weights.reduce((a, b) => a + b, 0);

  const raw = weights.map(w => (w / sum) * reviewsCount);
  const counts = raw.map(Math.floor);
  // Hand any rounding remainder to the largest bucket so totals match exactly.
  let remainder = reviewsCount - counts.reduce((a, b) => a + b, 0);
  while (remainder > 0) {
    const idx = raw.indexOf(Math.max(...raw.map((v, i) => (counts[i] < Math.ceil(v) ? v : -1))));
    counts[idx >= 0 ? idx : 0] += 1;
    remainder -= 1;
  }

  return [5, 4, 3, 2, 1].map((stars, i) => ({
    stars,
    count: counts[i],
    pct: reviewsCount ? Math.round((counts[i] / reviewsCount) * 100) : 0,
  }));
}

/** Short selling points built from the product's own description and specs. */
export function getHighlights(product: Product): string[] {
  const specHighlights = Object.entries(product.specs || {})
    .slice(0, 3)
    .map(([key, val]) => `${key}: ${val}`);
  return [product.shortDesc, ...specHighlights];
}

/**
 * Categories a mechanic would naturally service together, used to suggest
 * companion parts. Falls back to same-category items when no pairing exists.
 */
const COMPANION_CATEGORIES: Record<string, string[]> = {
  frenos: ["frenos", "suspension"],
  motor: ["filtros", "motor"],
  filtros: ["motor", "filtros"],
  suspension: ["frenos", "suspension"],
  electrico: ["iluminacion", "motor"],
  refrigeracion: ["motor", "filtros"],
  escape: ["motor", "filtros"],
  iluminacion: ["electrico", "filtros"],
};

/** Companion parts for a product, cheapest first so add-ons feel easy. */
export function getFrequentlyBoughtWith(product: Product, limit = 2): Product[] {
  const preferred = COMPANION_CATEGORIES[product.category] || [product.category];
  const scored = PRODUCTS.filter(p => p.id !== product.id)
    .map(p => {
      const rank = preferred.indexOf(p.category);
      return { p, rank: rank === -1 ? preferred.length : rank };
    })
    .sort((a, b) => a.rank - b.rank || a.p.price - b.p.price);

  return scored.slice(0, limit).map(s => s.p);
}

export const PROMO_SLIDES: PromoSlide[] = [
  {
    id: "promo-frenos",
    eyebrow: "Ahorra hasta 25%",
    headline: "Kits de freno completos",
    subhead: "Discos ventilados y pastillas cerámicas con envío gratis desde $99.",
    ctaText: "Ver frenos",
    categoryId: "frenos",
    image: "https://images.unsplash.com/photo-1613214150384-14921ff659b2?auto=format&fit=crop&w=1600&q=85"
  },
  {
    id: "promo-baterias",
    eyebrow: "Listo para el camino",
    headline: "Baterías AGM desde $129",
    subhead: "Arranque garantizado en frío con 3 años de cobertura total.",
    ctaText: "Ver baterías",
    categoryId: "electrico",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1600&q=85"
  },
  {
    id: "promo-suspension",
    eyebrow: "Manejo firme",
    headline: "Amortiguadores a gas monotubo",
    subhead: "Kits KYB y Bilstein para pickup, SUV y off-road.",
    ctaText: "Ver suspensión",
    categoryId: "suspension",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1600&q=85"
  },
  {
    id: "promo-filtros",
    eyebrow: "Mantenimiento al día",
    headline: "Filtros y aceite sintético",
    subhead: "Todo lo necesario para tu próximo servicio en un solo pedido.",
    ctaText: "Ver filtros",
    categoryId: "filtros",
    image: "https://images.unsplash.com/photo-1577762616603-0be18aaca637?auto=format&fit=crop&w=1600&q=85"
  }
];

export const POPULAR_LINK_COLUMNS: LinkColumn[] = [
  {
    title: "Marcas populares",
    links: [
      { label: "Repuestos Brembo" },
      { label: "Repuestos Bosch" },
      { label: "Repuestos ACDelco" },
      { label: "Repuestos KYB" },
      { label: "Repuestos Denso" },
      { label: "Repuestos Gates" }
    ]
  },
  {
    title: "Modelos populares",
    links: [
      { label: "Refacciones Toyota Hilux" },
      { label: "Refacciones Ford F-150" },
      { label: "Refacciones Chevrolet Silverado" },
      { label: "Refacciones Honda Civic" },
      { label: "Refacciones Nissan Frontier" },
      { label: "Refacciones Jeep Wrangler" }
    ]
  },
  {
    title: "Categorías más buscadas",
    links: [
      { label: "Pastillas y discos de freno", categoryId: "frenos" },
      { label: "Baterías y alternadores", categoryId: "electrico" },
      { label: "Amortiguadores y espirales", categoryId: "suspension" },
      { label: "Kits de distribución", categoryId: "motor" },
      { label: "Filtros de aire y aceite", categoryId: "filtros" },
      { label: "Faros y luces LED", categoryId: "iluminacion" }
    ]
  },
  {
    title: "Guías y consejos",
    links: [
      { label: "¿Cuándo cambiar las pastillas de freno?" },
      { label: "Señales de una batería agotada" },
      { label: "Cómo elegir amortiguadores" },
      { label: "Cada cuánto cambiar el aceite" },
      { label: "Qué significa la luz del motor" },
      { label: "Guía de filtros de aire" }
    ]
  }
];
