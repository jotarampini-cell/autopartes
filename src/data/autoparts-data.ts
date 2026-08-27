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
  logo: string;
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
    image: "https://images.unsplash.com/photo-1606577924006-27d39b132ae2?auto=format&fit=crop&w=600&q=80",
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
    image: "https://images.unsplash.com/photo-1577762616603-0be18aaca637?auto=format&fit=crop&w=600&q=80",
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
    image: "https://images.unsplash.com/photo-1606577924006-27d39b132ae2?auto=format&fit=crop&w=600&q=80",
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
    image: "https://images.unsplash.com/photo-1613214150384-14921ff659b2?auto=format&fit=crop&w=600&q=80",
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
