import styled from "styled-components";

const DashboardContainer = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.colors.background.primary};
`;

const MainContent = styled.main`
  flex: 1;
  padding: 1rem;
  overflow: auto;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 1.5rem;
  }
`;

const ContentWrapper = styled.div`
  margin: 0 auto 0 4rem;
  background-color: white;
  border-radius: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  padding: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 1.5rem;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  gap: 1rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const StatsGrid = styled.div`
  margin-bottom: 1.5rem;
`;

const StatsRow = styled.div`
  display: flex;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  gap: 1rem;

  /* Hide scrollbar but keep functionality */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StatsCardWrapper = styled.div`
  flex: 0 0 85%;

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex: 1;
  }
`;

const GridSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 2fr 1fr;
  }
`;

const TripleGridSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ChartCard = styled.div`
  background-color: white;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 0.75rem;
  padding: 1rem;
  height: 100%;
`;

const ChartTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;

export {
  DashboardContainer,
  MainContent,
  ContentWrapper,
  Header,
  Title,
  StatsGrid,
  StatsRow,
  StatsCardWrapper,
  GridSection,
  TripleGridSection,
  ChartCard,
  ChartTitle,
};
