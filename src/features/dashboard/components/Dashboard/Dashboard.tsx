import React, { useState, useMemo, useEffect } from "react";

import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";

import { usePhraseContext } from "../../../../hooks";

import {
  type PhraseSchema,
  STAT_CARDS_TYPE,
  type StatCardSchema,
} from "../../../../types";

import { PhraseProvider } from "../../../../context";

import { StatsCard } from "../StatsCard";
import { PhraseChart } from "../PhraseChart";
import { PhraseCalendar } from "../PhraseCalendar";
import { PhraseProgress } from "../PhraseProgress";
import { PhraseCategoryChart } from "../PhraseCategoryChart";
import { PhraseForm } from "../PhraseForm/PhraseForm";
import { PhraseList } from "../PhraseList/PhraseList";

import {
  ChartCard,
  ChartTitle,
  ContentWrapper,
  DashboardContainer,
  GridSection,
  Header,
  MainContent,
  StatsCardWrapper,
  StatsGrid,
  StatsRow,
  Title,
  TripleGridSection,
} from "./Dashboard.styles";

import { SearchBar, Sidebar } from "../../../../components";

import { withErrorBoundary } from "../../../../hoc/withErrorBoundary";

export const DashboardContent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const { phrases } = usePhraseContext();

  const [statCards, setStatCards] = useState<StatCardSchema[]>([
    {
      id: STAT_CARDS_TYPE.TOTAL_PHRASES,
      title: "Total Phrases",
      value: "0",
      icon: "trending-up",
      color: "purple",
      description: "Total phrases in your collection",
    },
    {
      id: STAT_CARDS_TYPE.THIS_WEEK,
      title: "This Week",
      value: "0",
      icon: "calendar",
      color: "orange",
      description: "Phrases added this week",
    },
    {
      id: STAT_CARDS_TYPE.AVERAGE_LENGTH,
      title: "Average Length",
      value: "0",
      icon: "bar-chart",
      color: "blue",
      description: "Average characters per phrase",
    },
    {
      id: STAT_CARDS_TYPE.CATEGORIES,
      title: "Categories",
      value: "0",
      icon: "pie-chart",
      color: "green",
      description: "Different categories used",
    },
  ]);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkIfMobile();

    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const phrasesThisWeek = useMemo<number>(() => {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    return phrases.filter((phrase: PhraseSchema) => {
      const createdAt = new Date(phrase.createdAt);
      return createdAt >= startOfWeek;
    }).length;
  }, [phrases]);

  const averageLength = useMemo<string>(() => {
    if (phrases.length === 0) return "0";
    const totalCharacters = phrases.reduce(
      (sum, phrase) => sum + phrase.text.length,
      0
    );
    return (totalCharacters / phrases.length).toFixed(1);
  }, [phrases]);

  const uniqueCategories = useMemo<string>(() => {
    if (phrases.length === 0) return "0";
    const categories = new Set<string>(phrases.map((p) => p.category));
    return categories.size.toString();
  }, [phrases]);

  useEffect(() => {
    setStatCards((cards) =>
      cards.map((card) => {
        switch (card.id) {
          case STAT_CARDS_TYPE.TOTAL_PHRASES:
            return { ...card, value: phrases.length.toString() };
          case STAT_CARDS_TYPE.THIS_WEEK:
            return { ...card, value: phrasesThisWeek.toString() };
          case STAT_CARDS_TYPE.AVERAGE_LENGTH:
            return { ...card, value: averageLength };
          case STAT_CARDS_TYPE.CATEGORIES:
            return { ...card, value: uniqueCategories };
          default:
            return card;
        }
      })
    );
  }, [phrases.length, phrasesThisWeek, averageLength, uniqueCategories]);

  const handleSearch = (term: string) => setSearchTerm(term);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reorderedCards = Array.from(statCards);
    const [removed] = reorderedCards.splice(result.source.index, 1);
    reorderedCards.splice(result.destination.index, 0, removed);
    setStatCards(reorderedCards);
  };

  return (
    <DashboardContainer>
      {!isMobile && <Sidebar />}

      <MainContent role="main">
        <ContentWrapper>
          <Header>
            <Title>Phrase Manager</Title>
          </Header>
          <StatsGrid>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="stats-row" direction="horizontal">
                {(provided) => (
                  <StatsRow
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {statCards.map((stat, index) => (
                      <Draggable
                        key={stat.id}
                        draggableId={stat.id}
                        index={index}
                      >
                        {(prov, snapshot) => (
                          <StatsCardWrapper
                            ref={prov.innerRef}
                            {...prov.draggableProps}
                            {...prov.dragHandleProps}
                            style={{
                              ...prov.draggableProps.style,
                              opacity: snapshot.isDragging ? 0.8 : 1,
                            }}
                          >
                            <StatsCard {...stat} />
                          </StatsCardWrapper>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </StatsRow>
                )}
              </Droppable>
            </DragDropContext>
          </StatsGrid>

          <GridSection>
            <ChartCard>
              <ChartTitle>Phrase Activity</ChartTitle>
              <PhraseChart />
            </ChartCard>
            <ChartCard>
              <ChartTitle>January</ChartTitle>
              <PhraseCalendar />
            </ChartCard>
          </GridSection>

          <TripleGridSection>
            <ChartCard>
              <ChartTitle>Add New Phrase</ChartTitle>
              <PhraseForm />
            </ChartCard>
            <ChartCard>
              <ChartTitle>Completion</ChartTitle>
              <PhraseProgress />
            </ChartCard>
            <ChartCard>
              <ChartTitle>Categories</ChartTitle>
              <PhraseCategoryChart />
            </ChartCard>
          </TripleGridSection>

          <ChartCard>
            <div className="flex items-center justify-between mb-4">
              <ChartTitle>Your Phrases</ChartTitle>
              <SearchBar onSearch={handleSearch} />
            </div>
            <PhraseList searchTerm={searchTerm} />
          </ChartCard>
        </ContentWrapper>
      </MainContent>
    </DashboardContainer>
  );
};

const DashboardComponent: React.FC = () => (
  <PhraseProvider>
    <DashboardContent />
  </PhraseProvider>
);

export const Dashboard = withErrorBoundary(DashboardComponent);
