'use client';

import React, { ReactNode } from 'react';
import { useScrollAnimation } from '@/lib/hooks/useScrollAnimation';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 700,
  threshold = 0.1,
  rootMargin = '-50px',
  triggerOnce = true
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation({
    threshold,
    rootMargin,
    triggerOnce
  });

  // Définir les transformations selon la direction
  const transformFrom = {
    up: 'translateY(50px)',
    down: 'translateY(-50px)',
    left: 'translateX(50px)',
    right: 'translateX(-50px)'
  };

  // Style de base
  const baseStyle = {
    opacity: 0,
    transform: transformFrom[direction],
    transition: `opacity ${duration}ms ease, transform ${duration}ms ease`,
    transitionDelay: `${delay}ms`
  };

  // Style quand visible
  const visibleStyle = {
    opacity: 1,
    transform: 'translate(0, 0)'
  };

  // Fusionner les styles en fonction de la visibilité
  const style = isVisible
    ? { ...baseStyle, ...visibleStyle }
    : baseStyle;

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={className} style={style}>
      {children}
    </div>
  );
} 