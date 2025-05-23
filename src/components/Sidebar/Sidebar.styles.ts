import styled from "styled-components";

const SidebarContainer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 4rem; /* w-16 */
  height: 100vh; /* h-screen */
  background-color: ${({ theme }) =>
    theme.colors.primary[700]}; /* bg-purple-700 */
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.space[6]} 0; /* py-6 */
  z-index: ${({ theme }) => theme.zIndices[10]};
`;

const ProfileWrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.space[8]}; /* mb-8 */
`;

const ProfileIcon = styled.div`
  width: 2.5rem; /* w-10 */
  height: 2.5rem; /* h-10 */
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;

  & > svg {
    width: 1.5rem; /* h-6/w-6 */
    height: 1.5rem;
    color: ${({ theme }) => theme.colors.primary[700]};
  }
`;

const Nav = styled.nav`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NavButton = styled.button`
  padding: ${({ theme }) => theme.space[2]}; /* p-2 */
  border: none;
  border-radius: ${({ theme }) => theme.radii.lg}; /* rounded-lg */
  background-color: ${({ theme }) => theme.colors.primary[700]};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) =>
      theme.colors.primary[900]}; /* hover:bg-purple-900 */
  }

  & > svg {
    width: 1.5rem; /* h-6/w-6 */
    height: 1.5rem;
    color: ${({ theme }) => theme.colors.white};
  }
`;

export { SidebarContainer, ProfileWrapper, ProfileIcon, Nav, NavButton };
