export type Tier = "bronze" | "silver" | "gold";
export type Role = "guest" | "pending" | "bronze" | "silver" | "gold" | "admin";

export type Product = {
  id: string;
  slug: string;
  nameKo: string;
  nameEn: string;
  category: string;
  image: string;
  imageAlt: string;
  retail: number;
  prices: Record<Tier, number>;
  moq: number;
  stock: number;
  descKo: string;
  descEn: string;
};

export const products: Product[] = [
  {
    id: "p001",
    slug: "glow-serum",
    nameKo: "비타민 글로우 세럼 30ml",
    nameEn: "Vitamin Glow Serum 30ml",
    category: "Serum",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
    imageAlt: "Glow serum bottle on neutral background",
    retail: 38.0,
    prices: { bronze: 16.5, silver: 14.2, gold: 12.0 },
    moq: 100,
    stock: 12000,
    descKo: "비타민 C 10% 함유. 자외선 손상 피부에 즉각적인 광채를 부여합니다.",
    descEn: "10% Vitamin C. Instant radiance for UV-damaged skin.",
  },
  {
    id: "p002",
    slug: "hydra-cream",
    nameKo: "하이드라 클라우드 크림 50ml",
    nameEn: "Hydra Cloud Cream 50ml",
    category: "Cream",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80",
    imageAlt: "Cloud-textured cream jar",
    retail: 42.0,
    prices: { bronze: 18.5, silver: 15.8, gold: 13.5 },
    moq: 100,
    stock: 8400,
    descKo: "히알루론산 5종 복합체. 24시간 보습 지속.",
    descEn: "5-type hyaluronic complex. 24-hour hydration.",
  },
  {
    id: "p003",
    slug: "centella-toner",
    nameKo: "센텔라 카밍 토너 200ml",
    nameEn: "Centella Calming Toner 200ml",
    category: "Toner",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=80",
    imageAlt: "Toner bottle with green leaves",
    retail: 28.0,
    prices: { bronze: 11.5, silver: 9.8, gold: 8.2 },
    moq: 200,
    stock: 22000,
    descKo: "센텔라 아시아티카 추출물 80%. 민감성 피부 진정.",
    descEn: "80% Centella Asiatica. Calms sensitive skin.",
  },
  {
    id: "p004",
    slug: "snail-mask",
    nameKo: "스네일 리페어 마스크 (10매)",
    nameEn: "Snail Repair Mask (10 sheets)",
    category: "Mask",
    image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&q=80",
    imageAlt: "Sheet mask packaging",
    retail: 24.0,
    prices: { bronze: 9.5, silver: 8.0, gold: 6.8 },
    moq: 300,
    stock: 35000,
    descKo: "달팽이 점액 여과물 92%. 손상 피부 재생.",
    descEn: "92% snail mucin filtrate. Repairs damaged skin.",
  },
  {
    id: "p005",
    slug: "rice-cleanser",
    nameKo: "라이스 브라이트 클렌저 150ml",
    nameEn: "Rice Bright Cleanser 150ml",
    category: "Cleanser",
    image: "https://images.unsplash.com/photo-1556228578-dd1ed72f88a4?w=800&q=80",
    imageAlt: "Cleanser bottle on marble",
    retail: 22.0,
    prices: { bronze: 8.8, silver: 7.5, gold: 6.2 },
    moq: 200,
    stock: 18000,
    descKo: "쌀겨 추출물 함유. 모공 속 노폐물 부드럽게 제거.",
    descEn: "Rice bran extract. Gently removes pore impurities.",
  },
  {
    id: "p006",
    slug: "rose-mist",
    nameKo: "로즈 글로우 미스트 100ml",
    nameEn: "Rose Glow Mist 100ml",
    category: "Mist",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80",
    imageAlt: "Pink rose mist bottle",
    retail: 26.0,
    prices: { bronze: 10.5, silver: 8.9, gold: 7.5 },
    moq: 150,
    stock: 14500,
    descKo: "다마스크 로즈 워터. 메이크업 위에도 분사 가능.",
    descEn: "Damask rose water. Refreshes over makeup.",
  },
  {
    id: "p007",
    slug: "sun-essence",
    nameKo: "데일리 선 에센스 SPF50+",
    nameEn: "Daily Sun Essence SPF50+",
    category: "Sun Care",
    image: "https://images.unsplash.com/photo-1556228852-80b6e5eeff06?w=800&q=80",
    imageAlt: "Sunscreen tube",
    retail: 32.0,
    prices: { bronze: 13.5, silver: 11.5, gold: 9.8 },
    moq: 100,
    stock: 9800,
    descKo: "백탁 없는 에센스 타입. SPF50+ PA++++.",
    descEn: "No-cast essence type. SPF50+ PA++++.",
  },
  {
    id: "p008",
    slug: "lip-tint",
    nameKo: "벨벳 무드 립 틴트 (5종)",
    nameEn: "Velvet Mood Lip Tint (5 shades)",
    category: "Lip",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&q=80",
    imageAlt: "Lip tint shades",
    retail: 18.0,
    prices: { bronze: 7.2, silver: 6.1, gold: 5.0 },
    moq: 250,
    stock: 28000,
    descKo: "5가지 무드 컬러. 12시간 지속 무광 마무리.",
    descEn: "5 mood shades. 12-hour matte finish.",
  },
];

export type PendingApplication = {
  id: string;
  email: string;
  company: string;
  bizNumber: string;
  country: string;
  contact: string;
  appliedAt: string;
};

export const pendingApplications: PendingApplication[] = [
  {
    id: "a001",
    email: "buyer@beautyhub.tokyo",
    company: "Beauty Hub Tokyo K.K.",
    bizNumber: "JP-1234-5678-9012",
    country: "Japan",
    contact: "Yuki Tanaka",
    appliedAt: "2026-05-07",
  },
  {
    id: "a002",
    email: "wholesale@miamicosmetics.com",
    company: "Miami Cosmetics Distribution LLC",
    bizNumber: "US-EIN-87-6543210",
    country: "United States",
    contact: "Sofia Hernandez",
    appliedAt: "2026-05-07",
  },
  {
    id: "a003",
    email: "import@parisbeaute.fr",
    company: "Paris Beauté Import SARL",
    bizNumber: "FR-SIRET-12345678901234",
    country: "France",
    contact: "Camille Dubois",
    appliedAt: "2026-05-08",
  },
];

export type Member = {
  id: string;
  email: string;
  company: string;
  country: string;
  tier: Tier;
  ytdVolume: number;
  joinedAt: string;
};

export const members: Member[] = [
  { id: "m001", email: "ops@seoulglow.kr", company: "Seoul Glow Trading", country: "South Korea", tier: "gold", ytdVolume: 184000, joinedAt: "2024-03-12" },
  { id: "m002", email: "buyer@nydermart.com", company: "NY Derma Mart", country: "United States", tier: "gold", ytdVolume: 152000, joinedAt: "2024-06-01" },
  { id: "m003", email: "info@kbeautyworld.de", company: "K-Beauty World GmbH", country: "Germany", tier: "silver", ytdVolume: 68000, joinedAt: "2025-01-08" },
  { id: "m004", email: "sales@bangkokbeaute.th", company: "Bangkok Beauté Co.", country: "Thailand", tier: "silver", ytdVolume: 54000, joinedAt: "2025-02-22" },
  { id: "m005", email: "hello@dubailuxe.ae", company: "Dubai Luxe Distribution", country: "UAE", tier: "bronze", ytdVolume: 18000, joinedAt: "2025-09-14" },
  { id: "m006", email: "contact@sydneykbeauty.au", company: "Sydney K-Beauty Pty", country: "Australia", tier: "bronze", ytdVolume: 12500, joinedAt: "2026-01-04" },
];

export type Order = {
  id: string;
  date: string;
  memberEmail: string;
  type: "sample" | "bulk";
  status: "pending" | "quoted" | "paid" | "shipped" | "delivered";
  total: number;
  itemCount: number;
};

export const orders: Order[] = [
  { id: "ORD-26050801", date: "2026-05-08", memberEmail: "ops@seoulglow.kr", type: "bulk", status: "paid", total: 14820, itemCount: 1200 },
  { id: "ORD-26050802", date: "2026-05-08", memberEmail: "buyer@nydermart.com", type: "bulk", status: "quoted", total: 9650, itemCount: 800 },
  { id: "ORD-26050701", date: "2026-05-07", memberEmail: "info@kbeautyworld.de", type: "sample", status: "shipped", total: 0, itemCount: 8 },
  { id: "ORD-26050601", date: "2026-05-06", memberEmail: "sales@bangkokbeaute.th", type: "bulk", status: "delivered", total: 7240, itemCount: 600 },
  { id: "ORD-26050401", date: "2026-05-04", memberEmail: "hello@dubailuxe.ae", type: "bulk", status: "delivered", total: 4180, itemCount: 350 },
  { id: "ORD-26050301", date: "2026-05-03", memberEmail: "contact@sydneykbeauty.au", type: "sample", status: "delivered", total: 0, itemCount: 5 },
];

// Shipping rate matrix: USD per kg
export const shippingRates: Record<string, number> = {
  Japan: 8.5,
  China: 9.0,
  "United States": 14.5,
  Canada: 15.5,
  Germany: 16.0,
  France: 16.0,
  "United Kingdom": 16.5,
  Thailand: 11.0,
  Vietnam: 11.5,
  Singapore: 12.5,
  UAE: 18.0,
  Australia: 17.5,
};

export function priceForRole(p: Product, role: Role): number | null {
  if (role === "bronze" || role === "silver" || role === "gold") {
    return p.prices[role];
  }
  return null;
}
