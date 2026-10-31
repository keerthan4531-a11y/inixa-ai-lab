import { ReactNode } from 'react'

export function currentPath(): string

export function useRoute(): string

export function navigate(to: string, options?: { replace?: boolean }): void

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string
  children: ReactNode
  onNavigate?: () => void
  className?: string
}

export function Link(props: LinkProps): React.JSX.Element
