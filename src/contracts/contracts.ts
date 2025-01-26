import { arbitrum, arbitrumSepolia, base } from "wagmi/chains";

export const CONTRACTS = {
  [arbitrumSepolia.id]: {
    event: "0xF7913F6bBDd7C25E2B8EFbb232df512bEb5129b7",
    marketplace: "0x4B562b4fAa56A5E80bF38aE5AD96bB0Ba49450b5",
    escrow: "0x337E30817209B5eBf90FF73Ca145cf3E147c103D",
    paymentToken: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d",
  },
  [arbitrum.id]: {
    event: "0x1be5c471CB8e23782e2790e27e1106F785C75676",
    marketplace: "0xCbeB4D1A275F3c8c6095EbD4a503AFD77228Bb4e",
    escrow: "0x1190442f6b7505d3edc30c59e5B99EBfdEeF34e9",
    paymentToken: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
  },
  [base.id]: {
    event: "0x7D41caDC4Ad09Af751BdA042ca78EE1d1F282CBD",
    marketplace: "0x24857eD6E1Fe00161DDC4A9cd83277172D7d617f",
    escrow: "0x716511223244de62dfdDf26461C926A46Ee2fC20",
    paymentToken: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  },
};
