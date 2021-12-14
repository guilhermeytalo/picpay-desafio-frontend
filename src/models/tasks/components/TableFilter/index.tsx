/* eslint-disable import/no-extraneous-dependencies */
import { useTheme } from 'styled-components';
import { SearchOutline } from '@styled-icons/evaicons-outline';
import { Equalizer2 } from '@styled-icons/icomoon';
import * as S from './styles';

const TableFilter = () => {
  const theme = useTheme();

  return (
    <S.Container>
      <S.WrapperInput>
        <S.InputFilter type="text" placeholder="Pesquisar por usuário" />
        <SearchOutline color={theme.colors.darkGrey} size={20} />
      </S.WrapperInput>
      <S.ButtonFilter type="button">
        <Equalizer2 color={theme.colors.black} size={15} />
        Filtrar
      </S.ButtonFilter>
    </S.Container>
  );
};

export default TableFilter;
