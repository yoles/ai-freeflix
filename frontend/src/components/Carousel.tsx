import React, { useRef, useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import classNames from 'classnames';

interface CarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  title?: string;
  autoScroll?: boolean;
  autoScrollInterval?: number;
  className?: string;
}

const Carousel = <T,>({
  items,
  renderItem,
  title,
  autoScroll = false,
  autoScrollInterval = 5000,
  className,
}: CarouselProps<T>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const checkArrows = () => {
      if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
      }
    };

    checkArrows();
    window.addEventListener('resize', checkArrows);

    return () => window.removeEventListener('resize', checkArrows);
  }, [items]);

  useEffect(() => {
    if (autoScroll && items.length > 0) {
      const interval = setInterval(() => {
        if (containerRef.current && !isDragging) {
          const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
          const newScrollLeft = scrollLeft + clientWidth;

          if (newScrollLeft >= scrollWidth) {
            containerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            containerRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
          }
        }
      }, autoScrollInterval);

      return () => clearInterval(interval);
    }
  }, [autoScroll, autoScrollInterval, items.length, isDragging]);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const { clientWidth } = containerRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
      
      containerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    if (containerRef.current) {
      const x = e.pageX - (containerRef.current.offsetLeft || 0);
      const walk = (x - startX) * 2;
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  return (
    <div className={classNames('relative group', className)}>
      {title && (
        <h2 className="text-xl font-medium text-white mb-4">{title}</h2>
      )}

      {/* Navigation Arrows */}
      {showLeftArrow && (
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll('left')}
          aria-label="Previous"
        >
          <FaChevronLeft size={20} />
        </button>
      )}

      {showRightArrow && (
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => scroll('right')}
          aria-label="Next"
        >
          <FaChevronRight size={20} />
        </button>
      )}

      {/* Items Container */}
      <div
        ref={containerRef}
        className={classNames(
          'flex overflow-x-auto scrollbar-hide snap-x snap-mandatory',
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        )}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="flex-none w-[300px] px-2 snap-start"
            style={{ scrollSnapAlign: 'start' }}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel; 