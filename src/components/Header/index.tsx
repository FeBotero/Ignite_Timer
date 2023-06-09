import { HeaderContainer } from './styles'
import { Timer, Scroll } from 'phosphor-react'
import { Link } from 'react-router-dom'

import Logo from '../../assets/Logo.svg'

export function Header() {
  return (
    <HeaderContainer>
      <img src={Logo} alt="" />
      <nav>
        <Link to="/" title="Timer">
          <Timer size={24} color="#FFF" />
        </Link>
        <Link to="/history" title="Histórico">
          <Scroll size={24} color="#FFF" />
        </Link>
      </nav>
    </HeaderContainer>
  )
}
