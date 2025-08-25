import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

const Pagination = ({ currentPage, totalCount, pageSize, onPageChange }) => {
  // Umumiy sahifalar sonini hisoblash
  const totalPages = Math.ceil(totalCount / pageSize);

  // Agar faqat bitta sahifa bo'lsa, komponentni ko'rsatmaymiz
  if (totalPages <= 1) {
    return null;
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Sahifalar ro'yxatini yaratish
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Joriy sahifadan boshlab qancha element ko'rsatilganini hisoblash
  const firstItemIndex = (currentPage - 1) * pageSize + 1;
  const lastItemIndex = Math.min(currentPage * pageSize, totalCount);

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6 mt-6 rounded-b-lg">
      <div className="flex items-center flex-1 justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Jami <span className="font-medium">{totalCount}</span> ta yozuvdan{' '}
            <span className="font-medium">{firstItemIndex}</span>-
            <span className="font-medium">{lastItemIndex}</span> gachasi ko'rsatilmoqda
          </p>
        </div>
        <div>
          <nav className="inline-flex -space-x-px rounded-md shadow-sm isolate" aria-label="Pagination">
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 text-gray-400 rounded-l-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
            >
              <span className="sr-only">Oldingi</span>
              <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
            </button>
            
            {/* Sahifa raqamlari (bu qismni sodda qoldiramiz, istalgancha murakkablashtirish mumkin) */}
            {pages.map(page => (
               <button
                key={page}
                onClick={() => onPageChange(page)}
                aria-current={page === currentPage ? 'page' : undefined}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                    page === currentPage 
                    ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-2 py-2 text-gray-400 rounded-r-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
            >
              <span className="sr-only">Keyingi</span>
              <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;