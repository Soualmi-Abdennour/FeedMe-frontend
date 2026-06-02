"use client"
import RouteGuardSkeleton from '@/components/atoms/RouteGuardSkeleton';
import Benefits from '@/components/landing/Benefits';
import Community from '@/components/landing/Community';
import CTA from '@/components/landing/CTA';
import FAQ from '@/components/landing/FAQ';
import Features from '@/components/landing/Features';
import Footer from '@/components/landing/Footer';
import Hero from '@/components/landing/Hero';
import Marquee from '@/components/landing/Marquee';
import Navbar from '@/components/landing/Navbar';
import ScrollReveal from '@/components/landing/ScrollReveal';
import { useHydratedAuth } from '@/utils/routeGuard.utils';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const { isHydrated, jwt, user } = useHydratedAuth();

  useEffect(() => {
    if (!isHydrated) return;

    if (user && jwt && user.isOnboardingCompleted) {
      router.replace("/publication");
      return;
    }

    if (user && jwt && !user.isOnboardingCompleted) {
      router.replace("/onboarding");
      return
    }
  }, [isHydrated, jwt, user, router]);

  if (!isHydrated) return <RouteGuardSkeleton />;

  if (user && jwt && user.isOnboardingCompleted) return <RouteGuardSkeleton />;
  if (user && jwt && !user.isOnboardingCompleted) return <RouteGuardSkeleton />;

  return (
    <div className="w-full min-h-screen bg-neutral-0">

    <ScrollReveal />
      <Navbar />
      <Hero />
      <Marquee />
      <Features />
      <Community />
      <Benefits />
      <CTA />
      <FAQ />
      <Footer />
    </div >
  );
}