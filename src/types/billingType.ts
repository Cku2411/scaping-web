export enum PackId {
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
}

export type CreditsPackType = {
  id: PackId;
  name: string;
  label: string;
  credits: number;
  price: number;
};

export const CreditsPack: CreditsPackType[] = [
  {
    id: PackId.SMALL,
    name: "Small Pack",
    label: "1.000 credits",
    credits: 1000,
    price: 999,
  },
  {
    id: PackId.MEDIUM,
    name: "Medium Pack",
    label: "5.000 credits",
    credits: 5000,
    price: 4999,
  },
  {
    id: PackId.LARGE,
    name: "Large Pack",
    label: "10.0000 credits",
    credits: 10000,
    price: 6999,
  },
];

export const getCreditsPack = (id: PackId) => {
  return CreditsPack.find((p) => p.id === id);
};
