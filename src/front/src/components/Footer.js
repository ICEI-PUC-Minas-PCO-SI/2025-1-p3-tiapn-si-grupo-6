// Footer.js
import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <RightFooter>
        <FooterColumn>
          <h4>Pet Shop</h4>
          <ul>
            <li><a href="#">Sobre Nós</a></li>
            <li><a href="#">Funcionalidades</a></li>
            <li><a href="#">© 2025 ERPet</a></li>
          </ul>
        </FooterColumn>

        <FooterColumn>
          <h4>Informações</h4>
          <ul>
            <li><a href="#">Contato</a></li>
            <li><a href="#">Política de Privacidade</a></li>
            <li><a href="#">Termos de Uso</a></li>
          </ul>
        </FooterColumn>

        <FooterColumn>
          <h4>Comprar Online</h4>
          <ul>
            <li><a href="#">Condições de envio</a></li>
            <li><a href="#">Meios de Pagamento</a></li>
            <li><a href="#">Como comprar</a></li>
          </ul>
        </FooterColumn>
      </RightFooter>

      <LeftFooter>
        <IconEmail src="/imgs/email-icon.png" alt="Email" />
        <IconFone src="/imgs/telefone-icon.png" alt="Telefone" />
        <IconWhats src="/imgs/whatsapp-icon.png" alt="WhatsApp" />
        <IconInstagram src="/imgs/instagram-icon.png" alt="Instagram" />
        <IconLinkedin src="/imgs/linkedin-icon.png" alt="LinkedIn" />
      </LeftFooter>
    </FooterContainer>
  );
};

export default Footer;

// 🔽 Styled Components
const FooterContainer = styled.footer`
  background-color: #6039B8;
  color: #fff;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 2rem;
  font-size: 0.85rem;
`;

const RightFooter = styled.div`
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
`;

const FooterColumn = styled.div`
  min-width: 150px;

  h4 {
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
    font-weight: bold;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 0.4rem;

      a {
        color: #fff;
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

const LeftFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;

  img {
    height: 30px;
  }
`;

const IconEmail = styled.img``;
const IconFone = styled.img``;
const IconWhats = styled.img``;
const IconInstagram = styled.img``;
const IconLinkedin = styled.img``;
