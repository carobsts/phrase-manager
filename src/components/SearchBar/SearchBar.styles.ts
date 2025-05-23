import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 16rem;
`;

const VisuallyHidden = styled.label`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 2.5rem 0.5rem 2.5rem;
  border-radius: 9999px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  outline: none;
  transition: box-shadow 0.2s;

  &:focus {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary[500]};
    border-color: transparent;
  }
`;

const IconLeft = styled.div`
  position: absolute;
  top: 50%;
  left: 0.75rem;
  transform: translateY(-50%);
  pointer-events: none;
  color: ${({ theme }) => theme.colors.text.muted};
  display: flex;
  align-items: center;
`;

const ClearButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0.75rem;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.muted};
  display: flex;
  align-items: center;

  &:hover {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export { Wrapper, VisuallyHidden, Input, IconLeft, ClearButton };
