import React from 'react';

export type CategoryType = 'all' | 'horror' | 'superhero' | 'scifi';

interface CategoryFilterProps {
  activeCategory: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onCategoryChange
}) => {
  const categories: { id: CategoryType; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'horror', label: 'Horror' },
    { id: 'superhero', label: 'Superhero' },
    { id: 'scifi', label: 'Sci-Fi' }
  ];

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="bg-zinc-900 p-1 rounded-lg inline-flex">
        {categories.map(category => (
          <button
            key={category.id}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              activeCategory === category.id
                ? 'bg-zinc-800 text-white'
                : 'text-zinc-400 hover:text-white'
            }`}
            onClick={() => onCategoryChange(category.id)}
            aria-current={activeCategory === category.id ? 'page' : undefined}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter; 