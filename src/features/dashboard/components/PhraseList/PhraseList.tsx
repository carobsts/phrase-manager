import { useMemo, useState, useEffect, useCallback, useRef } from "react";

import { motion, AnimatePresence } from "framer-motion";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "../../../../components/ui/button";

import type { PhraseSchema } from "../../../../types";

import { usePhraseContext } from "../../../../hooks";

import { PhraseCard } from "../PhraseCard";

interface PhraseListProps {
  searchTerm: string;
}

export const PhraseList = ({ searchTerm }: PhraseListProps) => {
  const { phrases } = usePhraseContext();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const [animatingPhrases, setAnimatingPhrases] = useState<PhraseSchema[]>([]);

  const prevPhrasesRef = useRef<PhraseSchema[]>([]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    if (prevPhrasesRef.current.length === 0 && phrases.length > 0) {
      prevPhrasesRef.current = [...phrases];
      setAnimatingPhrases([...phrases]);
      return;
    }

    const newPhrases = phrases.filter(
      (phrase) =>
        !prevPhrasesRef.current.some(
          (prevPhrase) => prevPhrase.id === phrase.id
        )
    );

    const deletedPhrases = prevPhrasesRef.current.filter(
      (prevPhrase) => !phrases.some((phrase) => phrase.id === prevPhrase.id)
    );

    const editedPhraseIds = phrases
      .filter((phrase) => {
        const prevPhrase = prevPhrasesRef.current.find(
          (p) => p.id === phrase.id
        );
        return (
          prevPhrase &&
          (prevPhrase.text !== phrase.text ||
            prevPhrase.category !== phrase.category)
        );
      })
      .map((phrase) => phrase.id);

    if (
      newPhrases.length > 0 ||
      deletedPhrases.length > 0 ||
      editedPhraseIds.length > 0
    ) {
      const updatedAnimatingPhrases = [
        ...phrases,
        ...deletedPhrases.map((phrase) => ({ ...phrase, isDeleting: true })),
      ] as PhraseSchema[];

      setAnimatingPhrases(updatedAnimatingPhrases);

      if (deletedPhrases.length > 0) {
        // eslint-disable-next-line no-undef
        setTimeout(() => {
          setAnimatingPhrases((prev) =>
            prev.filter((phrase) => !("isDeleting" in phrase))
          );
        }, 500);
      }
    }

    prevPhrasesRef.current = [...phrases];
  }, [phrases]);

  const filteredPhrases = useMemo(() => {
    return animatingPhrases.filter((phrase) =>
      phrase.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [animatingPhrases, searchTerm]);

  const totalPages = Math.ceil(filteredPhrases.length / itemsPerPage);

  const currentItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredPhrases.slice(startIndex, endIndex);
  }, [filteredPhrases, currentPage, itemsPerPage]);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);

    window.scrollTo({
      top: document.getElementById("phrase-list-container")?.offsetTop || 0,
      behavior: "smooth",
    });
  }, []);
  const goToPreviousPage = useCallback(() => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  }, [currentPage, goToPage]);

  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  }, [currentPage, totalPages, goToPage]);

  const getPageNumbers = useCallback(() => {
    const pageNumbers = [];
    const maxPageButtons = 5;

    if (totalPages <= maxPageButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);

      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        endPage = Math.min(totalPages - 1, maxPageButtons - 1);
      }

      if (currentPage >= totalPages - 2) {
        startPage = Math.max(2, totalPages - maxPageButtons + 2);
      }

      if (startPage > 2) {
        pageNumbers.push("...");
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }

      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  if (filteredPhrases.length === 0 && searchTerm) {
    return (
      <div
        className="text-center py-8 text-gray-500"
        aria-live="polite"
        data-testid="no-results-message"
      >
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        No phrases found matching "{searchTerm}"
      </div>
    );
  }

  if (phrases.length === 0) {
    return (
      <div
        className="text-center py-8 text-gray-500"
        aria-live="polite"
        data-testid="empty-state-message"
      >
        No phrases added yet. Add your first phrase above!
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div id="phrase-list-container">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        data-testid="phrase-list"
        aria-label="Phrase list"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <AnimatePresence mode="popLayout">
          {currentItems.map((phrase) => (
            <motion.div
              key={phrase.id}
              variants={itemVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              layout
            >
              <PhraseCard phrase={phrase} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {totalPages > 1 && (
        <nav
          className="flex flex-wrap justify-center items-center mt-8 gap-2"
          aria-label="Pagination"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="h-8 w-8 p-0"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous Page</span>
          </Button>

          {getPageNumbers().map((page, index) => (
            <Button
              key={index}
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => (typeof page === "number" ? goToPage(page) : null)}
              disabled={typeof page !== "number"}
              className={`h-8 w-8 p-0 ${
                typeof page !== "number"
                  ? "cursor-default hover:bg-transparent"
                  : ""
              } ${
                page === currentPage ? "bg-purple-700 hover:bg-purple-800" : ""
              }`}
              aria-label={
                typeof page === "number" ? `Page ${page}` : "More pages"
              }
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </Button>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="h-8 w-8 p-0"
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next Page</span>
          </Button>
        </nav>
      )}
    </div>
  );
};
