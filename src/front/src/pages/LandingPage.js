import styled from "styled-components";
import { BotaoCadastrar } from "../components/ui/BotaoCadastrar";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import InventoryIcon from "@mui/icons-material/Inventory";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button } from "@mui/material";


export default function ERPetLandingPage() {
    return (
        <LandingWrapper>
            {/* Hero Section */}
            <SectionHero>
                <TextContainer>
                    <h1>
                        <strong>ERPet</strong> – o sistema inteligente para pet shops
                    </h1>
                    <p>
                        Organize e automatize a <strong>gestão do seu pet shop</strong> com
                        praticidade.
                    </p>
                    <p>
                        Com o ERPet, você controla vendas, estoque, cadastros, agendamentos e
                        muito mais – tudo em um só lugar.
                    </p>
                    <Link to="/home">
                        <BotaoCadastrar className="bg-purple-600 text-white hover:bg-purple-700">
                            Entre para cuidar do seu pet shop
                        </BotaoCadastrar>
                    </Link>
                </TextContainer>

                <ImageContainer>
                    <img
                        src="/imgs/logo3.png"
                        alt="Mascotes ERPet"
                        className="max-w-xs md:max-w-md"
                    />
                </ImageContainer>
            </SectionHero>

            <FeatureContainer>
                <FeatureItem>
                    <IconWrapper>
                        <InventoryIcon fontSize="inherit" />
                    </IconWrapper>
                    <FeatureTitle>Tudo Organizado</FeatureTitle>
                    <FeatureDescription>
                        Cadastro de produtos, pets, fornecedores e mais.
                    </FeatureDescription>
                </FeatureItem>

                <FeatureItem>
                    <IconWrapper>
                        <EventNoteIcon fontSize="inherit" />
                    </IconWrapper>
                    <FeatureTitle>Estoque Inteligente</FeatureTitle>
                    <FeatureDescription>
                        Avisa vencimentos e baixa o estoque automático.
                    </FeatureDescription>
                </FeatureItem>

                <FeatureItem>
                    <IconWrapper>
                        <ShoppingCartIcon fontSize="inherit" />
                    </IconWrapper>
                    <FeatureTitle>Registro de Vendas</FeatureTitle>
                    <FeatureDescription>
                        Venda com ou sem cliente. Tudo simples e ágil.
                    </FeatureDescription>
                </FeatureItem>
            </FeatureContainer>

            {/* CTA Principal */}
            <SectionCTA>
                <h1>
                    SIMPLIFIQUE A GESTÃO DO SEU PET SHOP COM O ERPET!
                </h1>
                <p>
                    O ERPet é um sistema feito para facilitar o dia a dia do seu pet shop.
                    Controle estoque, registre vendas, cadastre produtos e clientes — tudo de
                    forma rápida e eficiente!
                </p>
                <Link to="/home">
                    <ERPetButton disableElevation>
                        Fale com o time ERPet
                    </ERPetButton>
                </Link>
            </SectionCTA>

            <ReviewsSection>
                <SectionTitle variant="h2">Opiniões De Clientes Sobre Nós</SectionTitle>
                <CardsContainer>
                    <ReviewItem>
                        <UserRow>
                            <UserPhoto src="/imgs/618d896674e7a.png" alt="Illy761" />
                            <Username>Illy761</Username>
                        </UserRow>
                        <ReviewText>
                            Fácil, rápido e prático! Agora meu humano não esquece mais da minha ração!
                        </ReviewText>
                    </ReviewItem>

                    <ReviewItem>
                        <UserRow>
                            <UserPhoto src="/imgs/Rectangle 32olhos.png" alt="Iucya_gatuna" />
                            <Username>Iucya_gatuna</Username>
                        </UserRow>
                        <ReviewText>
                            O sistema é mais rápido que eu correndo atrás do laser!
                        </ReviewText>
                    </ReviewItem>

                    <ReviewItem>
                        <UserRow>
                            <UserPhoto src="/imgs/619388814845b.png" alt="pequenoico" />
                            <Username>pequenoico</Username>
                        </UserRow>
                        <ReviewText>
                            Adoro quando minha ração chega sem atraso. Obrigado, ERPet!
                        </ReviewText>
                    </ReviewItem>
                </CardsContainer>
            </ReviewsSection>

        </LandingWrapper>
    );
}

// Styled Components
const LandingWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: sans-serif;
  background: linear-gradient(
    to bottom,
    #6039B8,       /* roxo da navbar/footer */
    #8e5cc6,       /* tom lilás intermediário */
    #cfc2e5,       /* lilás clarinho suave */
    #f3f0fb        /* quase branco com toque lilás */
  );
  color: white;
`;


const SectionHero = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  justify-content: center;
  align-items: center;
  text-align: center;
  max-width: 1000px;
  margin: 0 auto;

  @media(min-width: 1024px) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    text-align: left;
    gap: 2rem;
  }

  & img {
    max-width: 400px;
    width: 100%;
    height: auto;
  }
`;

const TextContainer = styled.div`
  max-width: 600px;
  margin-bottom: 2rem;

  h1 {
    font-size: 2rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  p {
    color: #e0dff4;
    margin-bottom: 1rem;
  }

  @media(min-width: 1024px) {
    margin-bottom: 0;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  max-width: 50%;
  display: flex;
  justify-content: center;
`;


const SectionCTA = styled.section`
  background-color: #6039B8;
  padding: 4rem 2rem;
  text-align: center;
  color: white;

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  p {
    max-width: 600px;
    margin: 0 auto 2rem auto;
    font-size: 1.125rem;
  }
`;

const FeatureContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  gap: 40px;
  padding: 40px 20px;
  max-width: 900px;
  margin: 0 auto 60px auto;
  font-family: Arial, sans-serif;
  background-color: #dcd4ea;
  border-radius: 12px;
  flex-wrap: wrap;
  color: #3c2a78;
`;

const FeatureItem = styled(Box)`
  flex: 1 1 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
`;

const IconWrapper = styled(Box)`
  color: #6039b8;
  font-size: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FeatureTitle = styled(Typography)`
  font-size: 22px;
  font-weight: bold;
  color: #3c2a78;
`;

const FeatureDescription = styled(Typography)`
  font-size: 16px;
  color: #5e4ea2;
  line-height: 1.5;
`;

const ERPetButton = styled(Button)({
    display: "block",
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto",
    padding: "16px 48px",
    fontSize: "60px",
    fontWeight: "bold",
    fontFamily: "Arial, sans-serif",
    borderRadius: "12px",
    backgroundColor: "#F59E0B !important",
    color: "#FFFFFF !important",
    textTransform: "none",
    "&:hover": {
        backgroundColor: "#F59E0B !important",
    },
});

const ReviewsSection = styled.section`
  background: linear-gradient(
    to bottom,
    #7b4dbf,
    #a17ed8,
    #d6caef
  );
  padding: 60px 20px;
`;

const SectionTitle = styled(Typography)`
  font-size: 28px;
  font-weight: bold;
  color: white;
  text-align: center;
  margin-bottom: 50px !important;
`;

const CardsContainer = styled(Box)`
  display: flex;
  gap: 30px;
  justify-content: center;
  flex-wrap: wrap;

  @media (min-width: 960px) {
    flex-wrap: nowrap;
    max-width: 900px;
    margin: 0 auto;
  }
`;

const ReviewItem = styled(Box)`
  background-color: #f59e0b;
  padding: 20px;
  border-radius: 20px 50px 20px 50px;
  color: white;
  width: 280px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const UserRow = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const UserPhoto = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

const Username = styled(Typography)`
  font-size: 18px;
  font-weight: bold;
  color: white;
`;

const ReviewText = styled(Typography)`
  font-size: 16px;
  color: white;
  line-height: 1.5;
`;