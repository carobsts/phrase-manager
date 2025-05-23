import { User, Home } from "lucide-react";

import {
  Nav,
  NavButton,
  ProfileIcon,
  ProfileWrapper,
  SidebarContainer,
} from "./Sidebar.styles";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <SidebarContainer className={className} aria-label="Main navigation">
      <ProfileWrapper>
        <ProfileIcon aria-label="User profile" role="img">
          <User />
        </ProfileIcon>
      </ProfileWrapper>

      <Nav aria-label="Main menu">
        <NavButton aria-label="Home" aria-current="page">
          <Home />
        </NavButton>
      </Nav>
    </SidebarContainer>
  );
}
