import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/atoms/button';
import { Title } from '../../components/atoms/Title';
import { Subtitle } from '../../components/atoms/Subtitle';

export const Home = () => {
  const navigate = useNavigate();
  const handleCompaniesNavigation = () => {
    navigate('/companies');
  };
  const handleSuppliersNavigation = () => {
    navigate('/suppliers');
  };
  return (
    <div className="flex flex-col gap-8 justify-center items-center">
      <div className="flex flex-col justify-center">
        <Title>Olá! Seja bem vindo.</Title>
        <Subtitle className="self-center">
          Escolha qual listagem quer visualizar
        </Subtitle>
      </div>
      <div className="flex justify-center gap-5">
        <Button variant="primary" onClick={handleCompaniesNavigation}>
          Empresas
        </Button>
        <Button variant="primary" onClick={handleSuppliersNavigation}>
          Fornecedores
        </Button>
      </div>
    </div>
  );
};
