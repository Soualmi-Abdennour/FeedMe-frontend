"use client";

import { CartTemplate } from '../features/cart/components/template/CartTemplate';

export default function Home() {
  // --- 1. قائمة المطاعم (قائمة المجموعات) ---
  const allCartGroups = [
    {
      accountId: "res_77",
      accountName: "Tacos de Lyon",
      username: "tacos_lyon_dz",
      accountAvatar: "/Screenshot 2026-01-21 190607.png",
      items: [
       
        {
          id: "b2",
          productName: "Onion Rings",
          price: 350,
          description: "Crispy fried onion rings.",
          image: "/Screenshot 2026-01-21 190607.png",
          qty: 3,
          accountId: "res_120",
        },
      ],
    },
    {
      accountId: "res_99",
      accountName: "Pizza Hut",
      username: "pizzahut_official",
      accountAvatar: "/Screenshot 2026-01-21 190607.png",
      items: [
    
        {
          id: "p2",
          productName: "Garlic Bread",
          price: 450,
          description: "Toasted bread with garlic butter and herbs.",
          image: "/Screenshot 2026-01-21 190607.png",
          qty: 2,
          accountId: "res_99",
        },
      ],
    },
    {
      accountId: "res_120",
      accountName: "Burger King",
      username: "bk_algeria",
      accountAvatar: "/Screenshot 2026-01-21 190607.png",
      items: [
        
          {
          id: "b1",
          productName: "Whopper Meal",
          price: 1450,
          description: "The classic Whopper with fries and a drink.",
          image: "/Screenshot 2026-01-21 190607.png",
          qty: 1,
          accountId: "res_120",
        },
        {
          id: "b2",
          productName: "Onion Rings",
          price: 350,
          description: "Crispy fried onion rings.",
          image: "/Screenshot 2026-01-21 190607.png",
          qty: 3,
          accountId: "res_120",
        },
      ],
    }
  ];

  return (
    <main className="min-h-screen bg-[#F5F4F0]">
      <CartTemplate initialGroups={allCartGroups} />
    </main>
  );
}