import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../app/stores';

import * as S from './styles';

const Header = () => {
  const { authStore } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    authStore.logout();

    navigate('/');
  };

  return (
    <S.Header>
      <S.Logo>
        <strong>Pay</strong>Friends
      </S.Logo>
      <S.WrapperAvatar>
        <Avatar
          src="https://avatars.dicebear.com/api/personas/picpay.svg"
          alt="Image do avatar do usuário"
        />
        <button type="button" onClick={handleLogout}>
          Sair
        </button>
      </S.WrapperAvatar>
    </S.Header>
  );
};

export default Header;
